import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { isValidDate } from '../util';
import { addFood } from '../../actions';

import { CompartmentSelect, IconSelect, QuantityAndUnitSelect, TextField } from './AddFoodForm';

export const AddFoodPopover = props => {
    const { loadFoods, setError } = props;

    const [name, setName] = useState('');
    const [nameWarning, setNameWarning] = useState('');

    const [expiry, setExpiry] = useState('');
    const [expiryWarning, setExpiryWarning] = useState('');

    const [compartment, setCompartment] = useState(null);
    const [compartmentWarning, setCompartmentWarning] = useState('');

    const [icon, setIcon] = useState(null);
    const [iconWarning, setIconWarning] = useState('');

    const [quantity, setQuantity] = useState('');
    const [quantityWarning, setQuantityWarning] = useState('');

    const [unit, setUnit] = useState(null);

    const [price, setPrice] = useState('');
    const [priceWarning, setPriceWarning] = useState('');

    const validateTextField = (warningMessage, field, setFieldWarning) => {
        const invalid = field === null || field.length === 0 || field.trim() === '';
        setFieldWarning(invalid ? warningMessage : '');

        return invalid;
    };

    const validateDateField = () => {
        const invalid = !isValidDate(expiry);
        setExpiryWarning(invalid ? 'please enter a valid date' : '');

        return invalid;
    };

    const validateNumericalField = () => {
        const invalid = quantity.trim() !== '' && isNaN(quantity);
        setQuantityWarning(invalid ? 'must be numerical' : '');

        return invalid;
    };

    const validateAddFoodFields = () => {
        const emptinessWarning = 'required field';

        if (name.length === 0 || !name.trim()) {
            setNameWarning(emptinessWarning);
        } else {
            setNameWarning('');
        }

        const nameInvalid = validateTextField(emptinessWarning, name, setNameWarning);
        const expiryInvalid = validateDateField();
        const compartmentInvalid = validateTextField(
            emptinessWarning,
            compartment !== null ? compartment.value : null,
            setCompartmentWarning
        );
        const iconInvalid = validateTextField(emptinessWarning, icon != null ? icon.value : null, setIconWarning);

        const quantityInvalid = validateNumericalField();

        return nameInvalid || expiryInvalid || compartmentInvalid || iconInvalid || quantityInvalid;
    };

    const addFoodToDB = () => {
        if (!validateAddFoodFields()) {
            addFood({
                name: name.trim(),
                expiry,
                compartment: compartment.value,
                icon: icon.value,
                quantity,
                unit: unit !== null ? unit.value : null,
            })
                .then(() => loadFoods())
                .catch(() => {
                    setError(true);
                });
        }
    };

    return (
        <div className="popOverContent">
            <TextField
                onChange={e => setName(e.target.value)}
                value={name}
                className="popOverField"
                placeholder="name"
                warning={nameWarning}
            />
            <TextField
                onChange={e => setExpiry(e.target.value)}
                value={expiry}
                className="popOverField"
                placeholder="expiry &nbsp; [mm-dd-yyyy]"
                warning={expiryWarning}
            />

            <CompartmentSelect
                compartmentWarning={compartmentWarning}
                compartment={compartment}
                setCompartment={setCompartment}
            />

            <IconSelect icon={icon} setIcon={setIcon} iconWarning={iconWarning} />

            <div className="optionalText"> - optional - </div>

            <QuantityAndUnitSelect
                quantity={quantity}
                setQuantity={setQuantity}
                quantityWarning={quantityWarning}
                unit={unit}
                setUnit={setUnit}
            />

            <TextField
                onChange={e => setPrice(e.target.value)}
                value={price}
                className="popOverField"
                placeholder="price"
                warning={priceWarning}
            />

            <Button bsPrefix="popOverSubmitButton" onClick={() => addFoodToDB()}>
                submit
            </Button>
        </div>
    );
};
