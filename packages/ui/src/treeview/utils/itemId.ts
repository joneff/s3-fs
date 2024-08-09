export const ID_SEPARATOR = '_';

export function generateItemId(index: number, parentItemId?: string) {
    if (parentItemId) {
        return `${parentItemId}${ID_SEPARATOR}${index}`;
    }

    return index.toString();
}
