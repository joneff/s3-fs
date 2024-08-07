import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

import { S3Client } from '@joneff/s3-client';
import { Treeview } from '@joneff/react-ui';

interface TreeviewDataItem {
    text: string,
    path: string,
    items: TreeviewDataItem[],
    hasChildren: boolean,
    expanded: boolean,
    selected: boolean
}


// #region utils
function listToTree(list: TreeviewDataItem[]) {
    const result : TreeviewDataItem[] = [];

    list.forEach((item: TreeviewDataItem) => {
        const parts = item.path.slice(0, -1).split('/');

        if (parts.length === 1) {
            result.push(item);
        } else {
            const match = findRec(parts.slice(0, -1).join('/'), result);

            if (match) {
                match.items.push(item);
                match.hasChildren = true;
            }
        }
    });

    return result;
}

function findRec(path: string, array: TreeviewDataItem[]) {
    const parts = path.split('/');

    if (parts.length === 1) {
        return array.find((item) => {
            return item.text === parts[0];
        });
    }

    const match = array.find((item) => {
        return item.text === parts[0];
    });

    if (match) {
        return findRec(parts.slice(1).join('/'), match.items);
    }

    return match;
}
// #endregion


export function FileBrowserTreeview(props) {
    const selected = props.selected;
    const [data, setData] = useState([] as any[]);
    const [loginInfo] = useLocalStorage('loginInfo', null);

    const fetchData = useCallback(async () => {
        // @ts-ignore
        const bucket = (loginInfo as {bucket: string}).bucket;
        // @ts-ignore
        const client = new S3Client(loginInfo);
        const rawData : any[] = await client.ls(bucket, '.');
        const tmpData : TreeviewDataItem[] = [];

        rawData.forEach(item => {
            if (item.Key.endsWith('/')) {
                const newItem : TreeviewDataItem = {
                    text: item.Key.slice(0, -1).split('/').pop(),
                    path: item.Key,
                    items: [],
                    hasChildren: false,
                    expanded: false,
                    selected: selected === item.Key
                };

                tmpData.push(newItem);
            }
        });

        const treeviewData : TreeviewDataItem[] = listToTree(tmpData);

        setData(treeviewData);

    }, [data]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Treeview data={data} selected={selected} />
        </>
    );
}
