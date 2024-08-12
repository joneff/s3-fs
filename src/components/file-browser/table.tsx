import { Link } from 'react-router-dom';
import { folderIcon, fileIcon } from '@progress/kendo-svg-icons';
import { Icon } from '@joneff/react-ui';
import { DataItem } from '../../utils';

type FileBrowserTableProps = {
    data: DataItem[],
    onNavigation: (cwd: string) => void
}

export function FileBrowserTable(props: FileBrowserTableProps & React.HTMLAttributes<HTMLTableElement>) {
    const {
        data,
        onNavigation,
        ...rest
    } = props;

    return (
        <>
            <table {...rest}
                className="table">
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
                                <td>
                                    {
                                        item.hasChildren
                                            ? <Link onClick={() => {onNavigation(item.path)}} to={item.path}>
                                                <Icon icon={folderIcon} />
                                                {item.text}
                                            </Link>
                                            : <span>
                                                <Icon icon={fileIcon} />
                                                {item.text}
                                            </span>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
