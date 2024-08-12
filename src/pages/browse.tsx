import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';

import { useFetchData, useMkDir, DataItem } from '../utils';
import { FileBrowser } from '../components';

type LoginInfo = {
    bucket: string,
    key: string,
    secret: string,
    region: string
}

export default function BrowserPage() {
    const navigate = useNavigate();

    const [loginInfo] : [null | LoginInfo, any] = useLocalStorage('loginInfo', null);
    const [data, setData] = useState({ tree: [], files: [] } as { tree: DataItem[], files: DataItem[]});
    const [cwd, setCwd] = useState(useParams()['*'] || '');
    const [pathExists, setPathExists] = useState(undefined);
    const fetchData = useFetchData(loginInfo!);
    const mkDir = useMkDir(loginInfo);

    useEffect(() => {
        if (loginInfo === null) {
            navigate('/login');
            return;
        }
    }, [loginInfo]);

    useEffect(() => {
        if (loginInfo !== null) {
            const result = fetchData(cwd);

            result.then(result => {
                if (result !== null) {
                    // @ts-ignore
                    setPathExists(true);
                    const tree = result[0];
                    const files = result[1];
                    const currentItem = result[2];

                    currentItem.selected = true;

                    setData({ tree, files: [...(currentItem.items || []), ...files] });
                } else {
                    // @ts-ignore
                    setPathExists(false);
                }
            });
        }
    }, [cwd]);

    function handleNavigation(cwd: string) {
        setCwd(cwd);
    }

    async function handleMkDir() {
        const dir = prompt('Directory name');

        if (dir === '' || dir === null) {
            return;
        }

        await mkDir(`${cwd}${dir}`).then(result => {
            navigate(cwd);
            setCwd(cwd);
        });
    }

    return (
        <>
            {pathExists === undefined && (
                <div>Loading ...</div>
            )}
            {pathExists === true && (
                <FileBrowser
                    data={data}
                    cwd={cwd}
                    onNeedData={() => {}}
                    onNavigation={handleNavigation}
                    onMkDir={handleMkDir}
                ></FileBrowser>
            )}
            {pathExists === false && (
                <div>Path not found</div>
            )}
        </>
    );
}
