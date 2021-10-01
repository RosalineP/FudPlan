import { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faCheck, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { deleteFoods, getFoods } from '../../actions';

import { FridgeButtonGroup } from './TopButtonGroup';

library.add(faPlus, faEdit, faSquare, faCheckSquare, faCheck, faChevronCircleRight, faChevronCircleLeft);

const classNames = require('classnames');

const images = require.context('../../assets/icons', true);

const FoodActionsButtons = props => {
    const { classNames, checkedFoods, isActive, loadFoods, resetCheckedFoods } = props;

    const deleteFoodAction = () => {
        if (isActive) {
            deleteFoods({ ids: Array.from(checkedFoods) }).then(() => {
                loadFoods();
                resetCheckedFoods();
            });
        }
    };

    return (
        <div className="foodActionsBar">
            <div className={classNames} onClick={() => deleteFoodAction()}>
                eat
            </div>
            {/*<div className={classNames} onClick={() => deleteFoodAction()}>*/}
            {/*    expire*/}
            {/*</div>*/}
        </div>
    );
};

const FoodRow = props => {
    const { isChecked, iconCell, nameCell, expiryCell, isCollapsed, unitCell, quantityCell, onClickReportId } = props;

    const [checked, setChecked] = useState(isChecked);

    const tickBox = () => {
        onClickReportId();
        setChecked(!checked);
    };

    return (
        <div className="ftRow">
            <div className="ftCell checkmarkCell" onClick={() => tickBox()}>
                {checked ? (
                    <FontAwesomeIcon className="icon" icon={faCheckSquare} size="lg" />
                ) : (
                    <FontAwesomeIcon className="icon" icon={faSquare} size="lg" />
                )}
            </div>
            <div className="ftCell iconCell">
                <img className="foodIcon" src={images(iconCell).default} alt="food icon" />
            </div>
            <div className="ftCell nameCell">{nameCell}</div>
            <div className="ftCell expiryCell">{expiryCell}</div>
            <div className="ftCell collapseButtonCell"> </div>
            <div className={classNames('ftCell', 'quantityCell', { noDisplay: isCollapsed })}>{quantityCell}</div>
            <div className={classNames('ftCell', 'unitCell', { noDisplay: isCollapsed })}>{unitCell}</div>
        </div>
    );
};

const FoodTable = props => {
    const { foodData, compartmentSelection, infoRefreshed, loadFoods } = props;

    const [checkedFoods, setCheckedFoods] = useState(new Set());
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const reportFoodChecked = id => {
        const oldSet = new Set(checkedFoods);
        let newSet;
        if (oldSet.has(id)) {
            oldSet.delete(id);
            newSet = oldSet;
        } else {
            newSet = oldSet.add(id);
        }
        setCheckedFoods(newSet);
    };

    const resetCheckedFoods = () => {
        setCheckedFoods(new Set());
    };

    const renderFoodRows = () => {
        if (!infoRefreshed) {
            return <div className="fridge__loadingText"> Loading... </div>;
        }

        const foodRows = foodData
            .filter(food => food.compartment === compartmentSelection)
            .map(food => (
                <FoodRow
                    key={food.id}
                    onClickReportId={() => reportFoodChecked(food.id)}
                    isChecked={checkedFoods.has(food.id)}
                    iconCell={food.icon}
                    nameCell={food.name}
                    expiryCell={food.expiry}
                    quantityCell={food.quantity}
                    unitCell={food.unit}
                    isCollapsed={isCollapsed}
                />
            ));
        return <div className="fridge__tableRows">{foodRows}</div>;
    };

    const foodActionButtonEnabled = infoRefreshed && checkedFoods.size > 0;
    const foodActionsBarClassNames = classNames('foodAction', {
        foodActionEnabled: foodActionButtonEnabled,
        foodActionDisabled: !infoRefreshed || checkedFoods.size <= 0,
    });

    return (
        <div className="fridge__tableAndActions">
            <div className="fridge__table noHighlight">
                <div className="fridgeTable">
                    <div className="ftRow ftHeader">
                        <div className="ftCell checkmarkCell">
                            <FontAwesomeIcon className="icon" icon={faCheck} size="lg" />
                        </div>
                        <div className="ftCell iconCell"> &nbsp; </div>
                        <div className="ftCell nameCell"> name </div>
                        <div className="ftCell expiryCell"> expiry </div>
                        <div className="ftCell collapseButtonCell">
                            <FontAwesomeIcon
                                className="icon clickable"
                                onClick={() => toggleCollapse()}
                                icon={isCollapsed ? faChevronCircleLeft : faChevronCircleRight}
                                size="lg"
                            />
                        </div>
                        <div className={classNames('ftCell', 'quantityCell', { noDisplay: isCollapsed })}>quantity</div>
                        <div className={classNames('ftCell', 'unitCell', { noDisplay: isCollapsed })}>unit</div>
                    </div>
                    {renderFoodRows()}
                </div>
            </div>
            <FoodActionsButtons
                classNames={foodActionsBarClassNames}
                isActive={foodActionButtonEnabled}
                checkedFoods={checkedFoods}
                loadFoods={loadFoods}
                resetCheckedFoods={resetCheckedFoods}
            />
        </div>
    );
};

export const Fridge = () => {
    const [compartmentSelection, setCompartmentSelection] = useState('fridge');
    const [foodData, setFoodData] = useState([]);
    const [infoRefreshed, setInfoRefreshed] = useState(false);

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = () => {
        getFoods().then(foodData => {
            setFoodData(foodData);
            setInfoRefreshed(true);
        });
    };

    return (
        <div className="fridge">
            <FridgeButtonGroup
                selection={compartmentSelection}
                loadFoods={loadFoods}
                onClickButton={newSelection => setCompartmentSelection(newSelection)}
            />
            <FoodTable
                foodData={foodData}
                compartmentSelection={compartmentSelection}
                loadFoods={loadFoods}
                infoRefreshed={infoRefreshed}
            />
        </div>
    );
};
