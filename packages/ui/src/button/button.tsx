import { State, classNames } from '../common';
import { BaseButton, BaseButtonProps } from '../base-button';
import './button.css';

export const BUTTON_CLASSNAME = 'push-button';

const states = [
    State.hover,
    State.focus,
    State.active,
    State.disabled
];

export type ButtonProps = BaseButtonProps;

export type ButtonStates = { [K in (typeof states)[number]]?: boolean };


export function Button(props: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <BaseButton {...props}
            className={classNames(
                props.className,
                BUTTON_CLASSNAME
            )}
        >
        </BaseButton>
    );
}
