import React from 'react';
import ReactDOM from 'react-dom/client';

import { ButtonGroup } from '../button-group';
import { Button } from '../../button';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <>
            <ButtonGroup>
                <Button>Button</Button>
                <div>not button</div>
                <Button>Button again</Button>
            </ButtonGroup>
        </>
    </React.StrictMode>,
);
