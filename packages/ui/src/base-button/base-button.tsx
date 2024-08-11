import { caretAltDownIcon } from '@progress/kendo-svg-icons';
import { State, classNames } from '../common';
import { ThemeColor } from '../common/enums';
import { Icon } from '../icon';
import './base-button.css';

export const BASE_BUTTON_CLASSNAME = 'button';

const states = [
    State.hover,
    State.focus,
    State.active,
    State.disabled
];

export type BaseButtonProps = {
    icon?: string
    hover?: boolean;
    focus?: boolean;
    active?: boolean;
    disabled?: boolean;
    themeColor?: ThemeColor;
};

type BaseButtonOnlyProps = {
    showArrow?: boolean;
}

export type BaseButtonStates = { [K in (typeof states)[number]]?: boolean };

const buttonDefaults = {
    themeColor: ThemeColor.neutral
};

export function BaseButton(props: BaseButtonProps & BaseButtonOnlyProps & React.HTMLAttributes<HTMLButtonElement>) {

    const {
        icon,
        showArrow,
        hover,
        focus,
        active,
        disabled,
        themeColor = buttonDefaults.themeColor,
        ...rest
    } = props;

    const hasChildren = props.children !== undefined;
    const hasIcon = icon !== undefined;

    return (
        <button {...rest}
            className={classNames(
                props.className,
                BASE_BUTTON_CLASSNAME,
                `button-${themeColor}`,
                {
                    'icon-button': !hasChildren && hasIcon
                }
            )}
        >
            {hasIcon && (
                <Icon className="button-icon" />
            )}

            {hasChildren && (
                <span className="button-text">{props.children}</span>
            )}

            {showArrow && (
                <span className="button-arrow">
                    <Icon icon={caretAltDownIcon} />
                </span>
            )}
        </button>
    );
}
