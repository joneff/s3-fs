import { classNames, State } from '../common';
import { Icon } from '../icon';
import { caretAltDownIcon, caretAltRightIcon } from '@progress/kendo-svg-icons';
import { TreeviewLeaf } from './treeview-leaf';
import { TreeviewGroup } from './treeview-group';

export const TREEVIEW_ITEM_CLASSNAME = 'treeview-item';

const states = [
    State.hover,
    State.focus,
    State.selected
];

export type TreeviewItemProps = {
    itemId?: string;
    parentItemId?: string;
    data?: null | any[];
    children?: JSX.Element | JSX.Element[];
    hasChildren?: boolean;
    expanded?: boolean;
    text?: string;
    icon?: string;
    leafClassName?: string;
    dir?: 'ltr' | 'rtl';
    onItemClick?: (event: TreeviewItemClickEvent) => void;
    onItemExpandChange?: (event: TreeviewItemExpandChangeEvent) => void;
};

export type TreeviewItemState = { [T in (typeof states)[number]]?: boolean };

export type TreeviewItemClickEvent = {
    reactEvent: React.SyntheticEvent,
    nativeEvent: Event,
    itemId?: string
}

export type TreeviewItemExpandChangeEvent = {
    reactEvent: React.SyntheticEvent,
    nativeEvent: Event,
    itemId: string,
    newState: boolean
}


export function TreeviewItem(props: TreeviewItemProps & TreeviewItemState & React.HTMLAttributes<HTMLLIElement>) {

    const {
        itemId,
        parentItemId,
        data,
        children,
        hasChildren,
        expanded,
        hover,
        focus,
        selected,
        text,
        icon,
        leafClassName,
        dir,
        className,
        onItemClick: _onItemClick,
        onItemExpandChange: _onItemExpandChange,
        ...rest
    } = props;

    const _hasChildren = hasChildren || children || data;
    const listChildren : JSX.Element[] = [];

    function onItemClick(event: React.SyntheticEvent) {
        if (typeof _onItemClick === 'function') {
            const treeviewItemClickEvent : TreeviewItemClickEvent= {
                reactEvent: event,
                nativeEvent: event.nativeEvent,
                itemId: itemId
            };
            _onItemClick(treeviewItemClickEvent);
        }
    }

    function onItemExpandChange(event: React.SyntheticEvent) {
        if (typeof _onItemExpandChange === 'function') {
            const treeviewItemExpandChangeEvent : TreeviewItemExpandChangeEvent = {
                reactEvent: event,
                nativeEvent: event.nativeEvent,
                itemId: itemId as string,
                newState: !expanded
            };
            _onItemExpandChange(treeviewItemExpandChangeEvent);
        }
    }

    if (children) {
        if (Array.isArray(children)) {
            listChildren.push(
                <TreeviewGroup dir={dir} key={listChildren.length}
                    children={children}
                    parentItemId={itemId}
                    onItemClick={_onItemClick}
                />
            );
        } else {
            if (children.type === TreeviewGroup) {
                listChildren.push(
                    <TreeviewGroup {...children.props}
                        dir={dir} key={listChildren.length}
                        parentItemId={itemId}
                        onItemClick={onItemClick}
                    />
                );
            }

            if (children.type === TreeviewItem) {
                listChildren.push(
                    <TreeviewGroup dir={dir} key={listChildren.length}
                        parentItemId={itemId}
                        children={children}
                        onItemClick={_onItemClick}
                    />
                );
            }
        }
    } else if (data) {
        if (Array.isArray(data)) {
            listChildren.push(
                <TreeviewGroup dir={dir} key={listChildren.length}
                    parentItemId={itemId}
                    data={data}
                    onItemClick={_onItemClick}
                />
            );
        }
    }


    return (
        <li {...rest}
            className={classNames(
                className,
                TREEVIEW_ITEM_CLASSNAME
            )}
        >
            <span className="treeview-mid">
                {_hasChildren && (
                    <span
                        className={classNames(
                            'treeview-toggle'
                        )}
                        onClick={onItemExpandChange}>
                        <Icon icon={expanded ? caretAltDownIcon : caretAltRightIcon} />
                    </span>
                )}
                <TreeviewLeaf
                    className={classNames(
                        leafClassName
                    )}
                    text={text}
                    icon={icon}
                    hover={hover}
                    focus={focus}
                    selected={selected}
                    onClick={onItemClick}
                />
            </span>
            {expanded && _hasChildren && (
                <>
                    {listChildren}
                </>
            )}
        </li>
    );
}
