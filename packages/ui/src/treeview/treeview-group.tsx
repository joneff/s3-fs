import { classNames } from '../common';
import { generateItemId } from './utils';
import { TreeviewItem, TreeviewItemClickEvent, TreeviewItemExpandChangeEvent } from './treeview-item';

export const TREEVIEW_GROUP_CLASSNAME = 'treeview-group';

export type TreeviewGroupProps = {
    parentItemId?: string;
    data?: null | any[];
    children?: JSX.Element | JSX.Element[];
    dir?: 'ltr' | 'rtl';
    onItemClick?: (event: TreeviewItemClickEvent) => void;
    onItemExpandChange?: (event: TreeviewItemExpandChangeEvent) => void;
}

export function TreeviewGroup(props: TreeviewGroupProps & React.HTMLAttributes<HTMLUListElement>) {
    const {
        parentItemId,
        data,
        children,
        dir,
        className,
        onItemClick,
        onItemExpandChange
    } = props;

    const listChildren : JSX.Element[] = [];

    if (children) {
        if (Array.isArray(children)) {
            children.forEach((child, index) => {
                if (child.type === TreeviewItem) {
                    listChildren.push(
                        <TreeviewItem {...child.props}
                            dir={dir} key={index}
                            parentItemId={parentItemId}
                            itemId={generateItemId(listChildren.length, parentItemId)}
                            onItemClick={onItemClick}
                            onItemExpandChange={onItemExpandChange}
                        />
                    );
                }
            });
        } else {
            if (children.type === TreeviewItem) {
                listChildren.push(
                    <TreeviewItem {...children.props}
                        dir={dir} key={listChildren.length}
                        parentItemId={parentItemId}
                        itemId={generateItemId(listChildren.length, parentItemId)}
                        onItemClick={onItemClick}
                        onItemExpandChange={onItemExpandChange}
                    />
                );
            }
        }
    } else if (data) {
        if (Array.isArray(data)) {
            data.forEach((dataItem, index) => {
                listChildren.push(
                    <TreeviewItem dir={dir} key={index}
                        parentItemId={parentItemId}
                        itemId={generateItemId(listChildren.length, parentItemId)}
                        data={dataItem.items}
                        text={dataItem.text}
                        icon={dataItem.icon}
                        expanded={dataItem.expanded}
                        selected={dataItem.selected}
                        onItemClick={onItemClick}
                        onItemExpandChange={onItemExpandChange}
                    />
                );
            });
        }
    }

    return (
        <ul
            className={classNames(
                className,
                TREEVIEW_GROUP_CLASSNAME
            )}
        >
            {listChildren}
        </ul>
    );
}
