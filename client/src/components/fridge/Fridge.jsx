import { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faCheck, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { getFoods } from '../../actions';

import { FridgeButtonGroup } from './ButtonGroup';

library.add(faPlus, faEdit, faSquare, faCheckSquare, faCheck, faChevronCircleRight, faChevronCircleLeft);

const classNames = require('classnames');

const images = require.context('../../assets/icons', true);

const FoodActionsBar = props => {
    const { classNames } = props;

    const deleteFood = () => {
        console.log('hey');
    };

    return (
        <div className="foodActionsBar">
            <div className={classNames} onClick={() => deleteFood()}>
                eat
            </div>
            <div className={classNames} onClick={() => deleteFood()}>
                expire
            </div>
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
                    <FontAwesomeIcon className="icon" icon={['far', 'check-square']} size="lg" />
                ) : (
                    <FontAwesomeIcon className="icon" icon={['far', 'square']} size="lg" />
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
    const { foodData, compartmentSelection, infoRefreshed, loadFoodsFunction } = props;

    const [checkedFoods, setCheckedFoods] = useState(new Set());
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const reportFoodChecked = id => {
        const oldSet = checkedFoods;
        let newSet;
        if (oldSet.has(id)) {
            oldSet.delete(id);
            newSet = oldSet;
        } else {
            newSet = oldSet.add(id);
        }
        setCheckedFoods(newSet);
    };

    const deHighlightActions = () => {
        setCheckedFoods(new Set());
    };

    const generateFoodRows = () => {
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
        return <div>{foodRows}</div>;
    };

    const foodActionsBarClassNames = classNames('foodAction', {
        foodActionEnabled: infoRefreshed && checkedFoods.size > 0,
        foodActionDisabled: !infoRefreshed || checkedFoods.size <= 0,
    });

    return (
        <div className="fridge__tableAndActions">
            <div className="fridge__table noHighlight">
                <div className="fridgeTable">
                    <div className="ftRow ftHeader">
                        <div className="ftCell checkmarkCell">
                            <FontAwesomeIcon className="icon" icon="check" size="lg" />
                        </div>
                        <div className="ftCell iconCell"> &nbsp; </div>
                        <div className="ftCell nameCell"> name </div>
                        <div className="ftCell expiryCell"> expiry </div>
                        <div className="ftCell collapseButtonCell">
                            <FontAwesomeIcon
                                className="icon clickable"
                                onClick={() => toggleCollapse()}
                                icon={isCollapsed ? 'chevron-circle-left' : 'chevron-circle-right'}
                                size="lg"
                            />
                        </div>
                        <div className={classNames('ftCell', 'quantityCell', { noDisplay: isCollapsed })}>quantity</div>
                        <div className={classNames('ftCell', 'unitCell', { noDisplay: isCollapsed })}>unit</div>
                    </div>
                    {generateFoodRows()}
                </div>
            </div>
            <FoodActionsBar
                classNames={foodActionsBarClassNames}
                isActive={(checkedFoods.size > 0).toString()}
                checkedFoods={checkedFoods}
                refreshAfterDelete={loadFoodsFunction}
                deHighlightActions={deHighlightActions}
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
                loadFoodsFunction={getFoods}
                infoRefreshed={infoRefreshed}
            />
        </div>
    );
};
