import AWS from 'aws-sdk';

export class S3Client {

    // #region fields
    private _client: AWS.S3;
    // #endregion


    // #region constructor
    constructor({key, secret, region}: {key: string, secret: string, region: string}) {
        this._client = new AWS.S3({
            accessKeyId: key,
            secretAccessKey: secret,
            region: region
        });
    }
    // #endregion


    // #region methods

    // #region ls
    async ls(bucket: string, dir: string = '') {
        const _dir = dir.trim();

        if (_dir === '' || _dir ==='/') {
            return this.lsRoot(bucket);
        }

        return this.lsDir(bucket, _dir);
    }
    async lsRoot(bucket: string) {
        const params : AWS.S3.ListObjectsRequest = {
            Bucket: bucket,
            Delimiter: '/'
        };

        return this._lsInternal(params);
    }
    async lsDir(bucket: string, dir: string = '') {
        const _dir = dir.trim();
        const _hasSlash = _dir.endsWith('/');

        if (_dir === '' || _dir === '/') {
            return this.lsRoot(bucket);
        }

        const params : AWS.S3.ListObjectsRequest = {
            Bucket: bucket,
            Prefix: _hasSlash ? _dir : `${_dir}/`,
            Delimiter: '/'
        }

        return this._lsInternal(params);
    }

    private async _lsInternal(params : AWS.S3.ListObjectsRequest) {
        const result : AWS.S3.ListObjectsOutput = {
            Name: params.Bucket,
            Prefix: params.Prefix,
            Delimiter: params.Delimiter,
            Contents: [],
            CommonPrefixes: []
        }
        let isTruncated = true;
        let marker;

        while (isTruncated) {
            if (marker !== undefined) {
                params.Marker = marker;
            }

            const response = await this._client.listObjects(params).promise();

            if (response.Contents?.length) {
                result.Contents!.push(...response.Contents)
            }

            if (response.CommonPrefixes?.length) {
                result.CommonPrefixes!.push(...response.CommonPrefixes)
            }

            isTruncated = response.IsTruncated!;

            if (isTruncated) {
                marker = response.NextMarker;
            }
        }

        return result;
    }
    // #endregion

    // #region mkdir
    async mkdir(bucket: string, dir: string) {
        const _dir = dir.trim();
        const _hasSlash = _dir.endsWith('/');

        if (_dir === '') {
            return Promise.reject('Directory name should not be empty.');
        }

        if (_dir === '/') {
            return Promise.reject(' Directory name is invalid.');
        }

        return this._mkdirInternal(bucket, _hasSlash ? _dir : `${_dir}/`);
    }

    private async _mkdirInternal(bucket: string, directory: string) {
        const params : AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: directory
        }

        return this._client.putObject(params)
            .promise()
            .then(promiseResult => {
                console.log(`Directory '${directory}' successfully created!`);
                return promiseResult;
            })
            .catch(reason => {
                console.error(`Directory '${directory} not created: ${reason}`);
            });
    }
    // #endregion

    // #region rm
    async rm(bucket: string, file: string) {
        const _file = file.trim();
        const _hasSlash = _file.endsWith('/');

        if (_file === '') {
            return Promise.reject('File name should not be empty.');
        }

        if (_hasSlash) {
            return Promise.reject('File name is invalid.');
        }

        return this._rmInternal(bucket, _file);
    }

    async rmdir(bucket: string, dir: string) {
        const _dir = dir.trim();
        const hasSlash = _dir.endsWith('/');

        if (_dir === '') {
            return Promise.reject('Directory name should not be empty');
        }

        if (_dir === '/') {
            return Promise.reject('Directory name invalid.');
        }

        return this._rmInternal(bucket, hasSlash ? _dir : `${_dir}/`);
    }

    private async _rmInternal(bucket: string, key: string) {
        const params : AWS.S3.DeleteObjectRequest = {
            Bucket: bucket,
            Key: key
        };

        return this._client.deleteObject(params).promise();
    }
    // #endregion

    async upload(bucket: string, file: string, content: Blob) {
        const _file = file.trim();
        const _hasSlash = file.endsWith('.');

        if (_file === '') {
            return Promise.reject('File name should not be empty.')
        }

        if (_hasSlash) {
            return Promise.reject('File name is invalid.')
        }

        const params : AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: file,
            Body: content
        };

        return this._client.upload(params).promise();
    }
    // #endregion

}
