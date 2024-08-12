
import { Toolbar, ToolbarItem, ToolbarSpacer, Button } from '@joneff/react-ui';
import { FileBrowserTreeview } from './file-browser/treeview';
import { FileBrowserTable } from './file-browser/table';
import { useEffect } from 'react';
import { DataItem } from '../utils';

type FileBrowserProps = {
    data: {
        tree: DataItem[],
        files: DataItem[]
    },
    cwd: string,
    onNeedData: (dir: string) => void,
    onNavigation: (cwd: string) => void
};

export function FileBrowser(props: FileBrowserProps & React.HTMLAttributes<HTMLDivElement>) {

    const {
        data,
        cwd = '',
        onNeedData,
        onNavigation,
        ...rest
    } = props;

    return (
        <div className="file-browser">
            <div className="navigation-pane">
                <FileBrowserTreeview
                    data={data.tree}
                    onNavigation={onNavigation}
                />
            </div>
            <div className="preview-pane">
                <Toolbar>
                    <ToolbarItem>
                        Viewing: {cwd === '' ? 'root' : cwd }
                    </ToolbarItem>
                </Toolbar>
                <FileBrowserTable
                    data={data.files}
                    onNavigation={onNavigation}
                />
            </div>
        </div>
    );
}
