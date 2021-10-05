import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';

import { FoodRow } from './FoodRow';
import { FoodActionButtons } from './FoodActionButtons';

const classNames = require('classnames');

export const FoodTable = props => {
    const { foodData, compartmentSelection, infoRefreshed, loadFoods, error, setError } = props;

    const [foodDisplay, setFoodDisplay] = useState(undefined);

    const [checkedFoods, setCheckedFoods] = useState(new Set());
    const [beingEditedFoods, setBeingEditedFoods] = useState(new Set());
    const [beingEditedData, setBeingEditedData] = useState(undefined);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [nameSort, setNameSort] = useState(undefined);
    const [expirySort, setExpirySort] = useState(undefined);

    useEffect(() => {
        console.log('foodData and infoRefreshed', foodData, infoRefreshed);
        if (infoRefreshed) {
            const foodRows = foodData.filter(food => food.compartment === compartmentSelection);

            setFoodDisplay(foodRows);
        }
    }, [infoRefreshed, foodData, compartmentSelection]);

    useEffect(() => {
        setCheckedFoods(new Set());
    }, [compartmentSelection]);

    useEffect(() => {
        if (beingEditedFoods.size > 0) {
            // setBeingEditedData()
        }
    }, [beingEditedFoods]);

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

    const sortRows = (sorted, column) => {
        if (column === 'name') {
            return foodDisplay.sort((food1, food2) => {
                if (food1[column] < food2[column]) {
                    return sorted === 'down' ? -1 : 1;
                } else if (food1[column] > food2[column]) {
                    return sorted === 'down' ? 1 : -1;
                } else {
                    return 0;
                }
            });
        } else {
            return foodDisplay.sort((food1, food2) => {
                const dateSplit1 = food1[column].split('-');
                const dateValue1 = dateSplit1[2] + dateSplit1[0] + dateSplit1; // gross. Todo: make cleaner
                const dateSplit2 = food2[column].split('-');
                const dateValue2 = dateSplit2[2] + dateSplit2[0] + dateSplit2;

                if (dateValue1 < dateValue2) {
                    return sorted === 'down' ? -1 : 1;
                } else if (dateValue1 > dateValue2) {
                    return sorted === 'down' ? 1 : -1;
                } else {
                    return 0;
                }
            });
        }
    };

    const renderFoodRows = () => {
        if (!infoRefreshed) {
            return <div className="fridge__loadingText"> Loading... </div>;
        }

        return (
            <div className="fridge__tableRows">
                {foodDisplay &&
                    foodDisplay.map(food => (
                        <FoodRow
                            key={food.id}
                            id={food.id}
                            onClickReportId={() => reportFoodChecked(food.id)}
                            loadFoods={loadFoods}
                            setError={setError}
                            isChecked={checkedFoods.has(food.id)}
                            iconCell={food.icon}
                            nameCell={food.name}
                            expiryCell={food.expiry}
                            quantityCell={food.quantity}
                            unitCell={food.unit}
                            isCollapsed={isCollapsed}
                            beingEdited={beingEditedFoods.has(food.id)}
                        />
                    ))}
            </div>
        );
    };

    const doSort = (sort, setSort, column) => {
        if (sort === undefined || sort === 'up') {
            setSort('down');
            setFoodDisplay(sortRows('down', column));
        } else if (sort === 'down') {
            setSort('up');
            setFoodDisplay(sortRows('up', column));
        }
    };

    const sortingIcon = (sort, setSort, column) => {
        return (
            <FontAwesomeIcon
                className="icon clickable"
                icon={sort === 'down' ? faAngleUp : faAngleDown}
                onClick={() => doSort(sort, setSort, column)}
            />
        );
    };

    const foodActionButtonEnabled = infoRefreshed && checkedFoods.size > 0;
    const foodActionsBarClassNames = classNames('foodAction', {
        foodActionEnabled: foodActionButtonEnabled,
        foodActionDisabled: !infoRefreshed || checkedFoods.size <= 0,
    });

    const errorDisplay = (
        <>
            <div className="ftRow errorDisplay">
                <div className="horizontalSpacer" />
                <FontAwesomeIcon className="errorIcon" icon={faSkullCrossbones} size="10x" />
            </div>
            <div className="ftRow errorText">
                <div className="horizontalSpacer" />
                <div className="errorText"> öops; please refresh </div>
            </div>
        </>
    );

    const toggleAllCheckMarks = () => {
        if (checkedFoods.size > 0) {
            resetCheckedFoods();
        } else {
            const ids = foodDisplay.map(food => food.id);
            const newSet = new Set();
            ids.forEach(id => newSet.add(id));

            setCheckedFoods(newSet);
        }
    };

    const headerRow = (
        <div className="ftRow ftHeader">
            <div className="ftCell checkmarkCell">
                <FontAwesomeIcon
                    className="icon clickable"
                    icon={faCheck}
                    size="lg"
                    onClick={() => toggleAllCheckMarks()}
                />
            </div>
            <div className="ftCell iconCell"> &nbsp; </div>
            <div className="ftCell nameCell">
                name &nbsp;
                {sortingIcon(nameSort, setNameSort, 'name')}
            </div>
            <div className="ftCell expiryCell">
                expiry &nbsp;
                {sortingIcon(expirySort, setExpirySort, 'expiry')}
            </div>
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
    );

    return (
        <div className="fridge__tableAndActions">
            <div className="fridge__table noHighlight">
                <div className="fridgeTable">
                    {headerRow}

                    {error && errorDisplay}
                    {!error && renderFoodRows()}
                </div>
            </div>
            <FoodActionButtons
                classNames={foodActionsBarClassNames}
                isActive={foodActionButtonEnabled}
                checkedFoods={checkedFoods}
                loadFoods={loadFoods}
                resetCheckedFoods={resetCheckedFoods}
                setBeingEditedFoods={setBeingEditedFoods}
                setError={setError}
            />
        </div>
    );
};
