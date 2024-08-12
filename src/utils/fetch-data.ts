import { useCallback } from 'react';
import { S3Client } from '@joneff/s3-client';

type LoginInfo = {
    bucket: string,
    key: string,
    secret: string,
    region: string
}

export type DataItem = {
    text: string,
    path: string,
    hasChildren: boolean,
    items?: DataItem[],
    expanded?: boolean,
    selected?: boolean
}

export type FileDataItem = DataItem & {}

export function useFetchData(loginInfo: LoginInfo) {

    // #region fetch internal
    const fetchInternal = useCallback(async (cwd: string) => {
        // @ts-ignore
        const bucket = (loginInfo as {bucket: string}).bucket;
        // @ts-ignore
        const client = new S3Client(loginInfo);

        return client.lsDir(bucket, cwd);
    }, []);
    // #endregion


    // #region fetch root
    const fetchRoot = useCallback(async () : Promise<[DataItem[], DataItem[], DataItem]> => {
        const rawData : AWS.S3.ListObjectsOutput = await fetchInternal('');
        const rootItem : DataItem = {
            text: 'Root',
            path: '',
            hasChildren: true,
            items: [],
            expanded: true
        };
        const cwdDirs : DataItem[] = [];
        const cwdFiles : DataItem[] = [];

        if (rawData.CommonPrefixes && rawData.CommonPrefixes.length) {
            rawData.CommonPrefixes.forEach((prefix) => {
                const text = prefix.Prefix!.replace('/', '')
                const dirItem : DataItem = {
                    text: text!,
                    path: prefix.Prefix!,
                    hasChildren: true,
                    items: []
                };
                cwdDirs.push(dirItem);
            });
        }

        if (rawData.Contents && rawData.Contents.length) {
            rawData.Contents.forEach((item) => {
                const fileItem : DataItem = {
                    text: item.Key!,
                    path: item.Key!,
                    hasChildren: false
                };

                cwdFiles.push(fileItem);
            });
        }

        rootItem.items = cwdDirs;

        return [[rootItem], cwdFiles, rootItem];

    }, []);
    // #endregion


    // #region fetch data
    const fetchData = useCallback(async (cwd: string) : Promise<null | [DataItem[], DataItem[], DataItem]> => {
        if (cwd === '') {
            return fetchRoot();
        }

        if (cwd.endsWith('/') === false) {
            return fetchData(`${cwd}/`);
        }

        const rawData : AWS.S3.ListObjectsOutput = await fetchInternal(cwd);
        const currentItem : DataItem = {
            text: '',
            path: '',
            hasChildren: true,
            items: [],
            expanded: true
        };
        const cwdDirs : DataItem[] = [];
        const cwdFiles : DataItem[] = [];

        // Check for existence
        if (rawData.Contents!.length === 0) {
            return null;
        }

        currentItem.text = rawData.Prefix?.slice(0, -1).split('/').pop() || '';
        currentItem.path = rawData.Prefix!;

        const cwdParts = cwd.slice(0, -1).split('/');
        // @ts-ignore
        const [fullPath, parentFiles, parentItem]  = await fetchData(cwdParts.slice(0, -1).join('/'));

        if (rawData.CommonPrefixes && rawData.CommonPrefixes.length) {
            rawData.CommonPrefixes.forEach((prefix) => {
                const text = (prefix.Prefix || '').slice(0, -1).split('/').pop()
                const dirItem : DataItem = {
                    text: text!,
                    path: prefix.Prefix!,
                    items: [],
                    hasChildren: true
                };
                cwdDirs.push(dirItem);
            });
        }

        if (rawData.Contents && rawData.Contents.length) {
            rawData.Contents.forEach((item) => {
                // Exclude self
                if (item.Key === rawData.Prefix) {
                    return
                }

                const fileItem : DataItem = {
                    text: (item.Key || '').replace(rawData.Prefix || '', ''),
                    path: item.Key!,
                    hasChildren: false
                };

                cwdFiles.push(fileItem);
            });
        }

        currentItem.items = cwdDirs;
        parentItem.items.forEach((item, index) => {
            if (item.path === currentItem.path) {
                parentItem.items.splice(index, 1, currentItem);
            }
        });

        return [fullPath, cwdFiles, currentItem];

    }, []);
    // #endregion

    return fetchData;
}
