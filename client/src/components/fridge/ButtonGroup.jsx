import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addFood } from '../../actions';

import { CompartmentSelect, IconSelect, QuantityAndUnitSelect, TextField } from './AddFood';

const classNames = require('classnames');

const FridgeButton = props => {
    const { compartment, selection, onClickButton } = props;

    const styling =
        compartment === 'freezer'
            ? 'fridge__btnGroupLeft'
            : compartment === 'fridge'
            ? 'fridge__btnGroupMiddle'
            : 'fridge__btnGroupRight';

    return (
        <Button
            className={classNames('greenButton', styling, {
                fridge__selectedButton: selection === compartment,
            })}
            onClick={() => onClickButton(compartment)}
        >
            {compartment}
        </Button>
    );
};

const AddFood = props => {
    const { loadFoods } = props;

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

    const addFoodToDB = () => {
        addFood({ name, expiry, compartment: compartment.value, icon: icon.value, quantity, unit }).then(() =>
            loadFoods()
        );
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
                placeholder="expiry &nbsp; [mm/dd/yyyy]"
                warning={expiryWarning}
            />

            <CompartmentSelect
                compartmentWarning={compartmentWarning}
                compartment={compartment}
                setCompartment={setCompartment}
            />

            <IconSelect icon={icon} setIcon={setIcon} iconWarning={iconWarning} />

            <div className="optional"> - optional - </div>

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

export const FridgeButtonGroup = props => {
    const { selection, onClickButton, refreshAfterAdd, loadFoods } = props;
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);

    return (
        <ButtonGroup size="lg" aria-label="compartment navigation" className="fridge__buttonGroup noHighlight">
            <FridgeButton compartment="freezer" selection={selection} onClickButton={onClickButton} />
            <FridgeButton compartment="fridge" selection={selection} onClickButton={onClickButton} />
            <FridgeButton compartment="pantry" selection={selection} onClickButton={onClickButton} />

            <FontAwesomeIcon
                onClick={() => setIsPopOverOpen(!isPopOverOpen)}
                className="icon fridge__addIcon"
                icon="plus"
                size="lg"
            />
            {isPopOverOpen && <AddFood refreshAfterAdd={refreshAfterAdd} loadFoods={loadFoods} />}
        </ButtonGroup>
    );
};
