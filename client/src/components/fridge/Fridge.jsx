import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faChevronCircleRight,
    faChevronCircleLeft,
    faSkullCrossbones,
    faAngleDown,
    faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

import { deleteFoods, getFoods } from '../../actions';

import { FridgeButtonGroup } from './TopButtonGroup';
import { FoodRow } from './FoodRow';

const classNames = require('classnames');

const FoodActionsButtons = props => {
    const { classNames, checkedFoods, isActive, loadFoods, resetCheckedFoods, setError, setBeingEditedFoods } = props;

    const deleteFoodAction = () => {
        if (isActive) {
            deleteFoods({ ids: Array.from(checkedFoods) })
                .then(() => {
                    loadFoods();
                    resetCheckedFoods();
                })
                .catch(() => {
                    setError(true);
                });
        }
    };

    return (
        <div className="foodActionsBar">
            <div className={classNames} onClick={() => deleteFoodAction()}>
                eat
            </div>
            <div
                className={classNames}
                onClick={() => {
                    setBeingEditedFoods(checkedFoods);
                }}
            >
                edit
            </div>
        </div>
    );
};

const FoodTable = props => {
    const { foodData, compartmentSelection, infoRefreshed, loadFoods, error, setError } = props;

    const [foodDisplay, setFoodDisplay] = useState(undefined);

    const [checkedFoods, setCheckedFoods] = useState(new Set());
    const [beingEditedFoods, setBeingEditedFoods] = useState(new Set());
    const [beingEditedData, setBeingEditedData] = useState(undefined);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [nameSort, setNameSort] = useState(undefined);
    const [expirySort, setExpirySort] = useState(undefined);

    useEffect(() => {
        if (infoRefreshed) {
            const foodRows = foodData // todo: Probably it would be more efficient to maintain an array of ids?
                .filter(food => food.compartment === compartmentSelection)
                .map(food => (
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
                ));
            setFoodDisplay(foodRows);
        }
    }, [infoRefreshed, foodData, checkedFoods, compartmentSelection, isCollapsed, beingEditedFoods]);

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

    const sortRows = (sorted, cell) => {
        if (cell === 'nameCell') {
            return foodDisplay.sort((food1, food2) => {
                if (food1.props[cell] < food2.props[cell]) {
                    return sorted === 'down' ? -1 : 1;
                } else if (food1.props[cell] > food2.props[cell]) {
                    return sorted === 'down' ? 1 : -1;
                } else {
                    return 0;
                }
            });
        } else {
            return foodDisplay.sort((food1, food2) => {
                const dateSplit1 = food1.props[cell].split('-');
                const dateValue1 = dateSplit1[2] + dateSplit1[0] + dateSplit1; // gross. Todo: make cleaner
                const dateSplit2 = food2.props[cell].split('-');
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

        return <div className="fridge__tableRows">{foodDisplay}</div>;
    };

    const doSort = (sort, setSort, cellName) => {
        if (sort === undefined || sort === 'up') {
            setSort('down');
            setFoodDisplay(sortRows('down', cellName));
        } else if (sort === 'down') {
            setSort('up');
            setFoodDisplay(sortRows('up', cellName));
        }
    };

    const sortingIcon = (sort, setSort, cellName) => {
        return (
            <FontAwesomeIcon
                className="icon clickable"
                icon={sort === 'down' ? faAngleUp : faAngleDown}
                onClick={() => doSort(sort, setSort, cellName)}
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
            const ids = foodDisplay.map(food => food.props.id);
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
                {sortingIcon(nameSort, setNameSort, 'nameCell')}
            </div>
            <div className="ftCell expiryCell">
                expiry &nbsp;
                {sortingIcon(expirySort, setExpirySort, 'expiryCell')}
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
            <FoodActionsButtons
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

export const Fridge = () => {
    const [compartmentSelection, setCompartmentSelection] = useState('fridge');
    const [foodData, setFoodData] = useState([]);
    const [infoRefreshed, setInfoRefreshed] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = () => {
        getFoods()
            .then(foodData => {
                setFoodData(foodData);
                setInfoRefreshed(true);
            })
            .catch(() => {
                setError(true);
            });
    };

    return (
        <div className="fridge">
            <FridgeButtonGroup
                selection={compartmentSelection}
                loadFoods={loadFoods}
                setError={setError}
                onClickButton={newSelection => setCompartmentSelection(newSelection)}
            />
            <FoodTable
                foodData={foodData}
                compartmentSelection={compartmentSelection}
                loadFoods={loadFoods}
                setError={setError}
                infoRefreshed={infoRefreshed}
                error={error}
            />
        </div>
    );
};
