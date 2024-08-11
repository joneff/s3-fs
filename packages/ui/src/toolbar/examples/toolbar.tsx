import React from 'react';
import ReactDOM from 'react-dom/client';

import { Toolbar, ToolbarItem, ToolbarSeparator, ToolbarSpacer } from '../index';
import { Button } from '../../button';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <>
            <Toolbar>
                <div>not child</div>
                <ToolbarSpacer size={20} />
                <ToolbarItem>
                    Custom item
                </ToolbarItem>
                <ToolbarSeparator />
                <ToolbarItem>
                    Another custom item
                </ToolbarItem>
                <Button>Button</Button>
            </Toolbar>
        </>
    </React.StrictMode>,
);
