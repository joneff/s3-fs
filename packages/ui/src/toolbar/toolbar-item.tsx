import { classNames } from '../common';

const TOOLBAR_ITEM_CLASSNAME = 'toolbar-item';

export type ToolbarItemProps = {
    className?: 'string'
}

export function ToolbarItem(props: ToolbarItemProps & React.HTMLAttributes<HTMLDivElement>) {
    const {
        className,
        ...rest
    } = props;

    return (
        <div {...rest}
            className={classNames(
                props.className,
                TOOLBAR_ITEM_CLASSNAME
            )}
        >
        </div>
    );
}
