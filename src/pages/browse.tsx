import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";

import { FileBrowserTreeview } from '../components/file-browser/treeview';
import { FileBrowserTable } from '../components/file-browser/table';

export default function BrowserPage() {
    const navigate = useNavigate();
    const cwd = useParams()['*'];
    const [loginInfo] = useLocalStorage('loginInfo', null);

    useEffect(() => {
        if (loginInfo === null) {
            navigate('/login');
        }
    }, [loginInfo]);

    return (
        <>
            <div className="file-browser">
                <div className="navigation-pane">
                    <FileBrowserTreeview selected={cwd} />
                </div>
                <div className="preview-pane">
                    <FileBrowserTable dir={cwd} />
                </div>
            </div>
        </>
    );
}
