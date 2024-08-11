import React from 'react';
import { classNames } from '../common';

export const TOOLBAR_SPACER_CLASSNAME = 'toolbar-spacer';
export const TOOLBAR_SPACER_SIZED_CLASSNAME = 'toolbar-spacer-sized';

export type ToolbarSpacerProps = {
    className?: 'string',
    size?:  number | string
}

export function ToolbarSpacer(props: ToolbarSpacerProps & React.HTMLAttributes<HTMLSpanElement>) {
    const {
        className,
        size,
        children,
        ...rest
    } = props;

    const hasSize = size !== undefined && (typeof size === 'string' || typeof size === 'number');

    return (
        <span {...rest}
            className={classNames(
                props.className,
                {
                    [TOOLBAR_SPACER_CLASSNAME]: !hasSize,
                    [TOOLBAR_SPACER_SIZED_CLASSNAME]: hasSize
                }
            )}
            style={hasSize ? {flexBasis: size} : {}}
        >
        </span>
    );
}
