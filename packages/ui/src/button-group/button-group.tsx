import { classNames } from '../common';
import { Button } from '../button';
import '../common/common.css';
import './button-group.css';

export const BUTTON_GROUP_CLASSNAME = 'button-group';

export type ButtonGroupProps = {
    className?: string;
    children?: JSX.Element | JSX.Element[];
}


export function ButtonGroup(props: ButtonGroupProps & React.HTMLAttributes<HTMLSpanElement>) {
    const {
        className,
        children,
        ...rest
    } = props;

    const buttons : JSX.Element[] = [];

    if (children) {
        if (Array.isArray(children)) {
            children.forEach((child) => {
                if (child.type === Button) {
                    buttons.push(
                        <Button {...child.props} key={buttons.length} />
                    );
                }
            });
        } else {
            if (children.type === Button) {
                buttons.push(
                    <Button {...children.props} key={buttons.length} />
                )
            }
        }
    }

    return (
        <span {...rest}
            className={classNames(
                props.className,
                BUTTON_GROUP_CLASSNAME
            )}
        >
            {buttons}
        </span>
    );
}
