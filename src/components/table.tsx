import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

import { S3Client } from '../client/s3-client';

export function Table() {
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
                text: item.Key.slice(0, -1).split('/').pop(),
                path: item.Key,
                items: item.Key.endsWith('/') ? [] : undefined
            };
            newData.push(newItem);
        });

        setData(newData);

    }, [data]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={i.toString() + item.path}>
                                <td>{item.text}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
