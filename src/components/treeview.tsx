import { useCallback, useState } from 'react';
import classNames from "classnames";
import { Link } from 'react-router-dom';

import { caretAltDownIcon, caretAltRightIcon } from '@progress/kendo-svg-icons';

import { Icon } from './icon';

export function Treeview({data, selected}) {
    return (
        <>
            <div className="treeview">
                <TreeviewGroup>
                    <TreeviewNode text="Root" path={'/'} expanded={true} selected={selected === undefined} items={data} />
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
        path,
        expanded,
        items,
        selected
    } = props;

    const [isExpanded, setExpanded] = useState(expanded || false);
    const [isSelected, setSelected] = useState(selected || false);

    const toggleClick = useCallback(() => {
        setExpanded(!isExpanded);
    }, [isExpanded]);

    const tvnClassName = classNames(
        'treeview-node',
        {
            'selected': isSelected === true
        }
    );
    const tvlClassName = classNames(
        'treeview-leaf',
        {
            'selected': isSelected === true
        }
    )

    return (
        <>
            <li className={tvnClassName}>
                <span className="treeview-mid">
                    {items.length !== 0 && <>
                        <span className="treeview-toggle" onClick={toggleClick}>
                            <Icon icon={isExpanded ? caretAltDownIcon : caretAltRightIcon} />
                        </span>
                    </>}
                    <Link reloadDocument to={`/browse/${path === '/' ? '' : path}`} className={tvlClassName}>{text}</Link>
                </span>
                {items.length !== 0 && <>
                    <TreeviewGroup items={items} hidden={!isExpanded} />
                </>}
            </li>
        </>
    );
}
