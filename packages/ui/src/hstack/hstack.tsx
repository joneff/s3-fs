import { classNames } from '../common';
import { Box } from '../box';

export function HStack(props) {
    const {
        children,
        className,

        ...rest
    } = props;

    const boxClassName = classNames(
        className,
        'hstack'
    );

    return (
        <>
            <Box className={boxClassName} {...rest}>
                {children}
            </Box>
        </>
    );
}
