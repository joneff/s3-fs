import { Link } from 'react-router-dom';
import { folderIcon, fileIcon } from '@progress/kendo-svg-icons';
import { Icon } from '../icon';

export function Table(props) {
    const {
        data
    } = props;

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
                                <td>
                                    {
                                        item.hasChildren
                                            ? <Link reloadDocument to={item.path}>
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
