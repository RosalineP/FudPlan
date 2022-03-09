import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import Select from 'react-select';

import { decrementFood } from '../../actions';
import { freshness } from '../util';

import { OPTIONS_ICON, OPTIONS_UNIT, SELECT_STYLES, SELECT_THEME } from './constants';

const images = require.context('../../assets/icons', true);

export const FoodRow = props => {
    const {
        isChecked,
        iconCell,
        nameCell,
        expiryCell,
        isCollapsed,
        unitCell,
        quantityCell,
        onClickReportId,
        loadFoods,
        setError,
        id,
        beingEdited,
        food
    } = props;
    const [checked, setChecked] = useState(isChecked);
    const [foodFields, setFoodFields] = useState({
        ...food
    });

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const tickBox = () => {
        onClickReportId();
        setChecked(!checked);
    };

    const deIncrementQuantity = () => {
        decrementFood({ id, quantity: quantityCell })
            .then(() => {
                loadFoods();
            })
            .catch(() => setError(true));
    };

    if (!beingEdited) {
        return (
            <div className="ft__row">
                <div className="checkmarkCell ft__cell" onClick={() => tickBox()}>
                    {checked ? (
                        <FontAwesomeIcon className="icon clickable" icon={faCheckSquare} size="lg" />
                    ) : (
                        <FontAwesomeIcon className="icon clickable" icon={faSquare} size="lg" />
                    )}
                </div>
                <div className="ft__cell iconCell">
                    <img className="foodIcon" src={images(iconCell).default} alt="food icon" />
                </div>
                <div className="nameCell ft__cell">{nameCell}</div>
                <div className={classNames('ft__cell expiryCell')}>{expiryCell}</div>
                <div className="ft__cell collapseButtonCell" />
                <div className={classNames( 'quantityCell', 'ft__cell', { noDisplay: isCollapsed })}>
                    <div className="quantityText">{quantityCell}</div>
                    {quantityCell !== null && quantityCell !== 0 && (
                        <>
                            &nbsp;
                            <FontAwesomeIcon
                                className="icon clickable"
                                icon={faCaretDown}
                                onClick={() => {
                                    deIncrementQuantity();
                                }}
                            />
                        </>
                    )}
                </div>
                <div className={classNames( 'unitCell', 'ft__cell', { noDisplay: isCollapsed })}>{unitCell}</div>
            </div>
        );
    } else {
        return (
            <div className="ftRow ftRowEdit">
                <div className=" checkmarkCell">
                    <FontAwesomeIcon className="icon" icon={faEdit} size="lg" />
                </div>
                <div className=" iconCell">
                    <Select
                        className="iconSelect"
                        value={foodFields.icon}
                        onChange={icon => {}}
                        options={OPTIONS_ICON}
                        styles={SELECT_STYLES}
                        placeholder="icon"
                        theme={SELECT_THEME}
                        components={{ IndicatorSeparator: () => null }}
                    />
                </div>
                <div className=" nameCell">
                    <input
                        type="text"
                        value={foodFields.name}
                        onChange={e => {
                            setFoodFields(currentState => ({ ...currentState, name: e.target.value }));
                        }}
                        className="nameEdit"
                        placeholder="name"
                    />
                </div>
                <div className=" expiryCell">
                    <input
                        type="text"
                        value={foodFields.expiry}
                        onChange={e => {
                            setFoodFields(currentState => ({ ...currentState, expiry: e.target.value }));
                        }}
                        className="nameEdit expiryEdit"
                        placeholder="expiry"
                    />
                </div>
                <div className=" collapseButtonCell" />
                <div className={classNames('', 'quantityCell', { noDisplay: isCollapsed })}>
                    <input
                        type="text"
                        value={foodFields.quantity}
                        onChange={e => {
                            setFoodFields(currentState => ({ ...currentState, quantity: e.target.value }));
                        }}
                        className="nameEdit quantityEditCell"
                        placeholder="quantity"
                    />
                </div>
                <div className={classNames('', 'unitCell', { noDisplay: isCollapsed })}>
                    <Select
                        className="iconSelect"
                        value={foodFields.unit}
                        onChange={() => {}}
                        options={OPTIONS_UNIT}
                        styles={SELECT_STYLES}
                        placeholder="unit"
                        theme={SELECT_THEME}
                        components={{ IndicatorSeparator: () => null }}
                    />
                </div>
            </div>
        );
    }
};
