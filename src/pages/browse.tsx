import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";

import { S3Client } from '../client/s3-client';
import { FileBrowserTreeview } from '../components/file-browser/treeview';
import { FileBrowserTable } from '../components/file-browser/table';

export default function BrowserPage() {
    const navigate = useNavigate();
    const cwd = useParams()['*'] || '';
    const [loginInfo] = useLocalStorage('loginInfo', null);

    useEffect(() => {
        if (loginInfo === null) {
            navigate('/login');
        }
    }, [loginInfo]);

    async function handleUpload(event) {
        const target = event.target;
        const files = target.files;
        const client = new S3Client(loginInfo);

        for (const file of files) {
            console.log(cwd, file.name)
            await client.upload(loginInfo.bucket, `${cwd}${file.name}`, file);
        }
    }

    async function handleMkDir() {
        const dir = prompt('Directory name');

        if (dir === '') {
            return;
        }

        const client = new S3Client(loginInfo);
        await client.mkdir(loginInfo.bucket, `${cwd}${dir}`);
    }

    return (
        <>
            <div className="file-browser">
                <div className="navigation-pane">
                    <FileBrowserTreeview selected={cwd} />
                </div>
                <div className="preview-pane">
                    <div className="toolbar">
                        <span className="spacer"></span>
                        <button onClick={handleMkDir}>Create directory</button>
                        <label>
                            Upload file:
                            <input type="file" onChange={handleUpload} />
                        </label>
                    </div>
                    <FileBrowserTable dir={cwd} />
                </div>
            </div>
        </>
    );
}
