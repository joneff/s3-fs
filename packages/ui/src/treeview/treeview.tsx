import { classNames, State, stateClassNames } from '../common';
import { TreeviewGroup } from './treeview-group';
import { TreeviewItem, TreeviewItemClickEvent, TreeviewItemExpandChangeEvent } from './treeview-item';
import './styles/treeview.css';

export const TREEVIEW_CLASSNAME = 'treeview';

const states = [
    State.disabled
];

export type TreeviewProps = {
    data?: null | any[];
    children?: JSX.Element | JSX.Element[];
    dir?: 'ltr' | 'rtl';
    onItemClick?: (event: TreeviewItemClickEvent) => void;
    onItemExpandChange?: (event: TreeviewItemExpandChangeEvent) => void;
};

export type TreeviewState = { [T in (typeof states)[number]]?: boolean };

export const Treeview = (props: TreeviewProps & TreeviewState & React.HTMLAttributes<HTMLDivElement>) => {

    const {
        data,
        children,
        dir,
        className,
        disabled,
        onItemClick: _onItemClick,
        onItemExpandChange: _onItemExpandChange,
        ...rest
    } = props;

    const listChildren : JSX.Element[] = [];

    function onItemClick(event: TreeviewItemClickEvent) {
        event.nativeEvent.stopPropagation();

        if (typeof _onItemClick === 'function') {
            _onItemClick(event);
        }
    }

    function onItemExpandChange(event: TreeviewItemExpandChangeEvent) {
        event.nativeEvent.stopPropagation();

        if (typeof _onItemExpandChange === 'function') {
            _onItemExpandChange(event);
        }
    }

    if (children) {
        if (Array.isArray(children)) {
            listChildren.push(
                <TreeviewGroup dir={dir} key={listChildren.length}
                    children={children}
                    onItemClick={onItemClick}
                    onItemExpandChange={onItemExpandChange}
                />
            );
        } else {
            if (children.type === TreeviewGroup) {
                listChildren.push(
                    <TreeviewGroup {...children.props}
                        dir={dir} key={listChildren.length}
                        onItemClick={onItemClick}
                        onItemExpandChange={onItemExpandChange}
                    />
                );
            }

            if (children.type === TreeviewItem) {
                listChildren.push(
                    <TreeviewGroup dir={dir} key={listChildren.length}
                        children={children}
                        onItemClick={onItemClick}
                        onItemExpandChange={onItemExpandChange}
                    />
                );
            }
        }
    } else if (data) {
        if (Array.isArray(data)) {
            listChildren.push(
                <TreeviewGroup dir={dir} key={listChildren.length}
                    data={data}
                    onItemClick={onItemClick}
                    onItemExpandChange={onItemExpandChange}
                />
            )
        }
    }

    return (
        <div {...rest}
            className={classNames(
                className,
                TREEVIEW_CLASSNAME,
                stateClassNames({
                    disabled
                })
            )}
            dir={dir}
        >
            {listChildren}
        </div>
    );
}
