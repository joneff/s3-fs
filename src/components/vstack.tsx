import classNames from 'classnames';
import { Box } from './box';

export function VStack(props) {
    const {
        children,
        className,

        ...rest
    } = props;

    console.log(className);

    const boxClassName = classNames(
        className,
        'vstack'
    );

    return (
        <>
            <Box className={boxClassName} {...rest}>
                {children}
            </Box>
        </>
    );
}
