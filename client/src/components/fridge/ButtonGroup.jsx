import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const FridgeButtonGroup = props => {
    const { selection, onClickButton } = props;
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
            {/* {this.state.isPopOverOpen && <AddFood refreshAfterAdd={this.props.refreshAfterAdd}/>} */}
        </ButtonGroup>
    );
};
