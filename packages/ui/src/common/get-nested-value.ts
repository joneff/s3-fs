export function getNestedValue(key: string, obj: Object | any[]) {
    const keys = (key || '').split('.');
    let value = obj;

    keys.forEach((key) => {
        value = value ? value[key] : undefined;
    });

    return value;
}
