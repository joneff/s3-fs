import AWS from 'aws-sdk';

export class S3Client {

    // #region fields
    private _client: AWS.S3;
    private _endpoint: AWS.Endpoint;
    // #endregion


    // #region properties
    get endpoint() {
        return this._endpoint;
    }
    // #endregion


    // #region constructor
    constructor({key, secret, region}) {
        this._client = new AWS.S3({
            accessKeyId: key,
            secretAccessKey: secret,
            region: region
        });
        this._endpoint = this._client.endpoint;
    }
    // #endregion

    // #region methods
    async ls(bucket: string, dir?: string) {
        const isRoot = dir === undefined || dir === '/';
        const isAll = dir === '.' || dir?.trim() === '';

        const params : AWS.S3.ListObjectsRequest = {
            Bucket: bucket,
            Delimiter: isRoot ? '\\/' : undefined,
            Prefix: isRoot ? undefined : dir.endsWith('/') ? dir : `${dir}/`
        }
        let isTruncated = true;
        let marker;
        const rawResult : AWS.S3.Object[] = [];

        if (isAll) {
            delete params.Delimiter;
            delete params.Prefix;
        }

        while (isTruncated) {
            if (marker !== undefined) {
                params.Marker = marker;
            }

            const response = await this._client.listObjects(params).promise();

            response.Contents!.forEach((item: AWS.S3.Object) => {
                rawResult.push(item);
            });

            isTruncated = response.IsTruncated!;

            if (isTruncated) {
                marker = response.NextMarker;
            }
        }

        if (isAll) {
            return rawResult.sort();
        }

        const result = rawResult
            .filter(item => {
                const key = item.Key!;

                // process root
                if (isRoot) {
                    return key.indexOf('/') === key.lastIndexOf('/');
                }

                const prefix = dir.endsWith('/') ? dir : `${dir}/`;

                // skip self
                if (key === prefix) {
                    return false;
                }

                if (key.indexOf(prefix) !== 0) {
                    return false;
                }

                const subKey = key.replace(prefix, '');

                return subKey.indexOf('/') === subKey.lastIndexOf('/')
            })
            .sort();

        return result;
    }

    async mkdir(bucket: string, dir: string) {
        if (dir === '') {
            return Promise.reject('Dir name should not be empty');
        }

        const parts = dir.split('/');
        const length = parts.length;

        if (length > 1) {
            return Promise.all(parts.map(async (part, index) => {
                const crumbs = parts.slice(0, index);
                crumbs.push(part);
                await this._mkdirInternal(bucket, crumbs.join('/'));
            }));
        }

        return this._mkdirInternal(bucket, dir);
    }

    private async _mkdirInternal(bucket: string, dir: string) {
        const params : AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: dir.endsWith('/') ? dir : `${dir}/`
        }
        const result = await this._client.putObject(params)
            .promise()
            .then(promiseResult => {
                console.log(`Directory '${dir}' successfully created!`);
                return promiseResult;
            })
            .catch(reason => {
                console.error(`Directory '${dir} not created: ${reason}`);
            });

        return result;
    }

    async upload(bucket: string, file: string, content: Blob) {
        const dir = file.split('/').slice(0, -1).join('/');

        if (dir !== '') {
            await this.mkdir(bucket, dir);
        }

        const params : AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: file,
            Body: content
        };

        const result = await this._client.upload(params).promise();

        return result;
    }

    async rm(bucket: string, path: string) {
        if (path.endsWith('')) {
            return Promise.reject('Path should be file');
        }

        return this._rmInternal(bucket, path);
    }

    async rmdir(bucket: string, dir: string) {
        const toDelete = await this.ls(bucket, dir === '/' ? undefined : dir);

        await Promise.all(toDelete.map(async (item) => {
            const key = item.Key!;

            if (key.endsWith('')) {
                return this.rmdir(bucket, key);
            } else {
                return this.rm(bucket, key);
            }
        }));

        return this._rmInternal(bucket, dir.endsWith('/') ? dir : `${dir}/`);
    }

    private async _rmInternal(bucket: string, key: string) {
        const params : AWS.S3.DeleteObjectRequest = {
            Bucket: bucket,
            Key: key
        };

        const result = await this._client.deleteObject(params).promise();

        return result;
    }
    // #endregion

}
