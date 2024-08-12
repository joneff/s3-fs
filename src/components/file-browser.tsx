
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
    onNavigation: (cwd: string) => void,
    onMkDir: () => void
    onUpload: (event: React.SyntheticEvent) => void
};

export function FileBrowser(props: FileBrowserProps & React.HTMLAttributes<HTMLDivElement>) {

    const {
        data,
        cwd = '',
        onNeedData,
        onNavigation,
        onMkDir: _onMkDir,
        onUpload: _onUpload,
        ...rest
    } = props;

    async function onMkDir(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();

        if (typeof _onMkDir === 'function') {
            await _onMkDir();
        }
    }

    async function onUpload(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation()

        if (typeof _onUpload === 'function') {
            await _onUpload(event);
        }
    }

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
                    <ToolbarSpacer />
                    <Button onClick={async (event) => {await onMkDir(event)}}>Create directory</Button>
                    <ToolbarItem>
                        <div className='upload'>
                            <Button className='fake-upload'>Upload file</Button>
                            <input className='real-upload' type='file' onChange={async (evnet: React.SyntheticEvent) => { await onUpload(event)}} />
                        </div>
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
