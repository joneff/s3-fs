import { classNames } from '../common';
import { ToolbarItem } from './toolbar-item';
import { ToolbarSeparator } from './toolbar-separator';
import { ToolbarSpacer } from './toolbar-spacer';
import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import './toolbar.css';

export const TOOLBAR_CLASS_NAME = 'toolbar';

export type ToolbarProps = {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    dir?: 'ltr' | 'rtl';
}

const allowedChildTypes = [
    ToolbarItem,
    ToolbarSeparator,
    ToolbarSpacer,
    Button,
    ButtonGroup
];

export function Toolbar(props: ToolbarProps & React.HTMLAttributes<HTMLDivElement>) {
    const {
        className,
        children,
        ...rest
    } = props;

    const toolbarChildren : JSX.Element[] = [];

    if (children) {
        if (Array.isArray(children)) {
            children.forEach((child) => {
                if (allowedChildTypes.includes(child.type)) {
                    toolbarChildren.push(
                        <child.type {...child.props} key={toolbarChildren.length} />
                    );
                }
            })
        } else {
            if (allowedChildTypes.includes(children.type)) {
                toolbarChildren.push(
                    <children.type {...children.props} key={toolbarChildren.length} />
                );
            }
        }
    }

    return (
        <div {...rest}
            className={classNames(
                props.className,
                TOOLBAR_CLASS_NAME
            )}
        >
            {toolbarChildren}
        </div>
    );
}
