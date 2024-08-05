import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

import { S3Client } from '../client/s3-client';

export function TreeView() {
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
            if (item.Key.endsWith('/')) {
                const newItem = {
                    text: item.Key.slice(0, -1).split('/').pop(),
                    path: item.Key,
                    items: []
                };
                newData.push(newItem);
            }
        });

        if (nodePath === undefined || nodePath ==='/') {
            setData(newData);
            return;
        }

        function findRec(path : string, array: any[]) {
            const parts = path.split('/');

            if (Array.isArray(array) === false) {
                return null;
            }

            if (parts.length === 0) {
                return null;
            }

            if (parts.length === 1) {
                return array.find((item) => {
                    return item.text === parts[0];
                });
            }

            const match = array.find(item => {
                return item.text === parts[0];
            });

            if (match) {
                return findRec(parts.slice(1).join('/'), match.items);
            }

            return null;

        }

        const tempData = data;
        const match = findRec(nodePath.slice(0, -1), tempData);

        if (match) {
            match.items = newData;
            setData(tempData);
        }

    }, [data]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <ul className="treeview">
                {data.map((item, i) => {
                    return (
                        <TreeViewNode key={i.toString() + item.path} {...item}
                            clickHandler={async () => {
                                await fetchData(item.path);
                            }}
                        />
                    );
                })}
            </ul>
        </>
    );
}

function TreeViewNode(props) {

    const {
        text,
        items,
        clickHandler
    } = props;

    return (
        <>
            <li>
                <button type="button" className="toggle" onClick={clickHandler}>+</button>
                {text}
                {items.length !== 0 && <>
                    <ul>
                        {items.map((item, i) => {
                            return (
                                <TreeViewNode key={i.toString() + item.path}
                                    {...item}
                                    clickHandler={clickHandler}
                                />
                            );
                        })}
                    </ul>
                </>}
            </li>
        </>
    );
}
