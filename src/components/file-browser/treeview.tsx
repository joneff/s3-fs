import { useCallback, useState } from 'react';
import { Treeview, TreeviewProps, TreeviewItemClickEvent } from '@joneff/react-ui';
import { Navigate, useNavigate } from 'react-router';

interface TreeviewDataItem {
    text: string,
    path: string,
    items: TreeviewDataItem[],
    hasChildren: boolean,
    expanded: boolean,
    selected: boolean
}

type FileBrowserTreeviewProps = TreeviewProps & {
    onNavigation: (cwd: string) => void;
}

export function FileBrowserTreeview(props: FileBrowserTreeviewProps & React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();
    const [cwd, setCwd] = useState('');

    const {
        data,
        selected,
        onNavigation,
        ...rest
    } = props;

    const onItemClick = useCallback((event: TreeviewItemClickEvent) => {
        const { reactEvent, nativeEvent, itemId } = event;
        const target = nativeEvent.target;

        let currentElement : HTMLElement = nativeEvent.target;
        const parts : string[] = [];

        while (currentElement.parentElement !== null) {
            if (currentElement.classList.contains('treeview')) {
                break;
            }
            if (currentElement.classList.contains('treeview-item')) {
                const textElement = currentElement.querySelector('.treeview-leaf > .treeview-leaf-text');
                if (textElement) {
                    parts.push(textElement.textContent || '');
                }
            }
            currentElement = currentElement.parentElement;
        }

        if (typeof onNavigation === 'function') {
            const _dir = parts.slice(0, -1).reverse().join('/');

            if (_dir === '') {
                navigate('');
                onNavigation('');
            } else {
                navigate(`${_dir}/`);
                onNavigation(`${_dir}/`);
            }
        }
    }, [])

    return (
        <>
            <Treeview {...rest}
                data={data}
                selected={selected}
                onItemClick={onItemClick} />
        </>
    );
}
