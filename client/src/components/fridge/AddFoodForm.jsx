import Select from 'react-select';

import { OPTIONS_ICON, OPTIONS_UNIT, SELECT_STYLES, SELECT_THEME } from './constants';

export const TextField = props => {
    const { warning, nameField, onChange, className, placeholder } = props;

    return (
        <span>
            <div className="textFieldNotification"> {warning} </div>
            <input type="text" value={nameField} onChange={onChange} className={className} placeholder={placeholder} />
        </span>
    );
};

export const CompartmentSelect = props => {
    const { compartmentWarning, compartment, setCompartment } = props;

    const compartmentSelectOptions = [
        { value: 'freezer', label: 'freezer' },
        { value: 'fridge', label: 'fridge' },
        { value: 'pantry', label: 'pantry' },
    ];

    return (
        <span>
            <div className="textFieldNotification"> {compartmentWarning} </div>
            <Select
                className="popOverField popOverSelect"
                value={compartment}
                onChange={compartment => setCompartment(compartment)}
                options={compartmentSelectOptions}
                styles={SELECT_STYLES}
                placeholder="compartment"
                theme={SELECT_THEME}
            />
        </span>
    );
};

export const IconSelect = props => {
    const { iconWarning, icon, setIcon } = props;

    return (
        <span>
            <div className="textFieldNotification"> {iconWarning} </div>
            <Select
                className="popOverField popOverSelect"
                value={icon}
                onChange={icon => setIcon(icon)}
                options={OPTIONS_ICON}
                styles={SELECT_STYLES}
                placeholder="icon"
                theme={SELECT_THEME}
            />
        </span>
    );
};

export const QuantityAndUnitSelect = props => {
    const { setQuantity, quantity, quantityWarning, unit, setUnit } = props;

    return (
        <div className="quantityAndUnitSelect">
            <TextField
                onChange={e => setQuantity(e.target.value)}
                value={quantity}
                className="popOverField popOverQuantitiesText"
                placeholder="quantity"
                warning={quantityWarning}
            />

            <Select
                className="popOverField popOverUnitSelect"
                value={unit}
                onChange={unit => setUnit(unit)}
                options={OPTIONS_UNIT}
                styles={SELECT_STYLES}
                placeholder="unit"
                theme={SELECT_THEME}
            />
        </div>
    );
};
