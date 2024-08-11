import React from 'react';
import ReactDOM from 'react-dom/client';

import { Button } from '../index';
import { ThemeColor } from '../../common/enums';

function onClick(event: React.SyntheticEvent) {
    console.log(event);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <>
            <Button onClick={onClick}>Button Neutral</Button>
            <Button onClick={onClick} themeColor={ThemeColor.primary}>Button Primary</Button>
        </>
    </React.StrictMode>,
);
