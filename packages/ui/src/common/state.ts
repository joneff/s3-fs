import { classNames } from './classnames';

export enum State {
    hover = 'hover',
    focus = 'focus',
    active = 'active',
    selected = 'selected',
    disabled = 'disabled',
    valid = 'valid',
    invalid = 'invalid',
    loading = 'loading',
    required = 'required'
};

export function stateClassNames(props: any) {
    return classNames({
        'hover': props.hover,
        'focus': props.focus,
        'active': props.active,
        'selected': props.selected,
        'disabled': props.disabled,
        'valid': props.valid,
        'invalid': props.invalid,
        'loading': props.loading,
        'required': props.loading
    });
}
