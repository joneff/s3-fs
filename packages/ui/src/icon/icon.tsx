export function Icon({icon}) {
    return (
        <>
            <span className="icon">
                <svg viewBox={icon.viewBox}
                    dangerouslySetInnerHTML={{__html: icon.content}}
                >
                </svg>
            </span>
        </>
    );
}
