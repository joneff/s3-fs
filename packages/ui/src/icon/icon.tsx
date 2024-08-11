import './styles/icon.css';

export type IconProps = {
    icon?: { viewBox: string, content: string }
}

export function Icon(props: IconProps & React.HTMLAttributes<HTMLSpanElement>) {

    const {
        icon
    } = props;

    const hasIcon = icon !== undefined;

    return (
        <>
            <span className="icon">
                {hasIcon && (
                    <svg viewBox={icon.viewBox}
                        dangerouslySetInnerHTML={{__html: icon.content}}
                    >
                    </svg>
                )}
            </span>
        </>
    );
}
