import { classNames, State, stateClassNames } from '../common';
import { Icon } from '../icon'

export const TREEVIEW_LEAF_CLASSNAME = 'treeview-leaf';

const states = [
    State.hover,
    State.focus,
    State.selected
];

export type TreeviewLeafProps = {
    text?: string;
    icon?: string;
    onClick?: (event: React.SyntheticEvent) => void;
};

export type TreeviewLeafState = { [T in (typeof states)[number]]?: boolean };


export function TreeviewLeaf(props: TreeviewLeafProps & TreeviewLeafState & React.HTMLAttributes<HTMLSpanElement>) {
    const {
        text,
        icon,
        hover,
        focus,
        selected,
        className,
        onClick,
        ...rest
    } = props;


    return (
        <span
            className={classNames(
                className,
                TREEVIEW_LEAF_CLASSNAME,
                stateClassNames({
                    hover,
                    focus,
                    selected
                })
            )}
            onClick={onClick}
            {...rest}
        >
            {icon !== undefined && <Icon icon={icon} />}
            <span className="treeview-leaf-text">
                {text}
            </span>
        </span>
    );
}
