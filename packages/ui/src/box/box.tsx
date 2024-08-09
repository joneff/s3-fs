import { classNames } from '../common';

export function Box(props) {
    const {
        children,
        className,

        padding,
        margin,

        spacing,

        ...rest
    } = props;

    const boxClassName = classNames(
        {
            [`padding-${padding}`]: padding !== undefined,
            [`margin-${margin}`]: margin !== undefined,
            [`spacing-${spacing}`]: spacing !== undefined,
        },
        className
    );

    return (
        <div className={boxClassName} {...rest}>
            {children}
        </div>
    );
}
