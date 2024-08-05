import { useCallback, useState } from 'react';
import classNames from "classnames";
import { caretAltDownIcon, caretAltRightIcon } from '@progress/kendo-svg-icons';

import { Icon } from './icon';

export function Treeview({data}) {
    return (
        <>
            <div className="treeview">
                <TreeviewGroup>
                    <TreeviewNode text="Root" expanded={true} items={data} />
                </TreeviewGroup>
            </div>
        </>
    );
}

function TreeviewGroup(props) {
    const {
        items,
        children,
        hidden
    } = props;

    const tvgClassName = classNames(
        'treeview-group',
        {
            'hidden': hidden === true
        }
    );

    return (
        <ul className={tvgClassName}>
            {children === undefined && <>
                {items.map((item, i) => {
                    return (
                        <TreeviewNode key={i.toString() + item.path}
                            {...item}
                        />
                    );
                })}
            </>}
            {children}
        </ul>
    );
}

function TreeviewNode(props) {

    const {
        text,
        expanded,
        items
    } = props;

    const [isExpanded, setExpanded] = useState(expanded || false);
    const toggleClick = useCallback(() => {
        setExpanded(!isExpanded);
    }, [isExpanded]);

    const tvnClassName = classNames(
        'treeview-node',
    );

    console.log('isExpanded', text, isExpanded);

    return (
        <>
            <li className={tvnClassName}>
                <span className="treeview-mid">
                    {items.length !== 0 && <>
                        <span className="treeview-toggle" onClick={toggleClick}>
                            <Icon icon={isExpanded ? caretAltDownIcon : caretAltRightIcon} />
                        </span>
                    </>}
                    <span className="treeview-leaf">{text}</span>
                </span>
                {items.length !== 0 && <>
                    <TreeviewGroup items={items} hidden={!isExpanded} />
                </>}
            </li>
        </>
    );
}
