import React from 'react';
import ReactDOM from 'react-dom/client';

import { Treeview, TreeviewItemClickEvent, TreeviewItemExpandChangeEvent } from '../index';

const data = [
    {
        text: 'root',
        items: [
            { text: 'item 1' },
            { text: 'item 2' }
        ]
    }
];

function onItemClick(event: TreeviewItemClickEvent) {
    console.log(event);
}

function onItemExpandChange(event: TreeviewItemExpandChangeEvent) {
    console.log(event);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <>
            <Treeview data={data}
                onItemClick={onItemClick}
                onItemExpandChange={onItemExpandChange}
            >
            </Treeview>
        </>
    </React.StrictMode>,
);
