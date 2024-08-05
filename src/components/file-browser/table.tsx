import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

import { S3Client } from '../../client/s3-client';
import { Table } from '../table';

export function FileBrowserTable(props) {
    const dir = props.dir;
    const [data, setData] = useState([] as any[]);

    const [loginInfo] = useLocalStorage('loginInfo', null);
    const fetchData = useCallback(async (nodePath? : string) => {
        // @ts-ignore
        const bucket = (loginInfo as {bucket: string}).bucket;
        // @ts-ignore
        const client = new S3Client(loginInfo);
        const rawData : any[] = await client.ls(bucket, nodePath);
        const newData : any[] = [];

        rawData.forEach(item => {
            const newItem = {
                text: (item.Key.endsWith('/') ? item.Key.slice(0, -1) : item.Key).split('/').pop(),
                path: item.Key,
                hasChildren: item.Key.endsWith('/') ? true : false
            };
            newData.push(newItem);
        });

        setData(newData);

    }, [data]);

    useEffect(() => {
        fetchData(dir);
    }, []);

    return (
        <>
            <Table data={data} />
        </>
    );
}
