import { classNames } from '../common';

export const TOOLBAR_SEPARATOR_CLASSNAME = 'toolbar-separator';

export type ToolbarSeparatorProps = {
    className?: 'string'
}

export function ToolbarSeparator(props: ToolbarSeparatorProps & React.HTMLAttributes<HTMLSpanElement>) {
    const {
        className,
        children,
        ...rest
    } = props;

    return (
        <span {...rest}
            className={classNames(
                props.className,
                TOOLBAR_SEPARATOR_CLASSNAME
            )}
        >
        </span>
    );
}
