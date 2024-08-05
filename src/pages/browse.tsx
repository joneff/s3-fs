import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";

import { FileBrowserTreeview } from '../components/file-browser/treeview';
import { Table } from '../components/table';

export default function BrowserPage() {
    const navigate = useNavigate();
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
                    <FileBrowserTreeview />
                </div>
                <div className="preview-pane">
                    <Table />
                </div>
            </div>
        </>
    );
}
