import { Dispatch, FC, memo, ReactElement, SetStateAction, useEffect, useState } from 'react';

import { getFood, getFoods } from '../../actions';

import { CompartmentState, Food } from '../../types';

import { sortCompartments, sortDates, sortFoods, updateSet } from '../util';

import { FoodRow } from './FoodRow';
import { FoodTableHeader } from './FoodTableHeader';
import { ErrorDisplay } from './ErrorDisplay';

const DEFAULT_STATE = {
    nameSort: 'desc',
    expSort: 'desc',
    selected: new Set() as Set<string>,
    isCollapsed: false,
    foodRows: undefined,
};

interface Props {
    compartmentSelection: string;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
}

export const FoodTable: FC<Props> = memo(props => {
    const { compartmentSelection, error, setError } = props;
    const [foodData, setFoodData] = useState<Food[]>([]);
    const [freezerState, setFreezerState] = useState<CompartmentState>({ ...DEFAULT_STATE });
    const [fridgeState, setFridgeState] = useState<CompartmentState>({ ...DEFAULT_STATE });
    const [pantryState, setPantryState] = useState<CompartmentState>({ ...DEFAULT_STATE });

    const currentState =
        compartmentSelection === 'freezer'
            ? freezerState
            : compartmentSelection === 'fridge'
            ? fridgeState
            : pantryState;
    const setCurrentState =
        compartmentSelection === 'freezer'
            ? setFreezerState
            : compartmentSelection === 'fridge'
            ? setFridgeState
            : setPantryState;

    useEffect(() => {
        (async () => {
            try {
                const foods = await getFoods();
                const { fridge, freezer, pantry } = sortCompartments(foods);

                setFreezerState({ ...freezerState, foodRows: freezer });
                setFridgeState({ ...fridgeState, foodRows: fridge });
                setPantryState({ ...pantryState, foodRows: pantry });

                setFoodData(foods);
            } catch (e) {
                //    todo
            }
        })();
    }, []);

    const reloadFoodRow = async (id: string) => {
        try {
            const updatedFood = await getFood(id);
            if (currentState.foodRows) {
                const updatedFoodData = currentState.foodRows.map(food => (food.id === id ? updatedFood[0] : food));
                setCurrentState({ ...currentState, foodRows: updatedFoodData });
            }
        } catch {
            // todo
        }
    };

    const selectOrUnselectFood = (id: string): void => {
        setCurrentState({ ...currentState, selected: updateSet(id, currentState.selected) });
    };

    const unselectAll = (): void => {
        setCurrentState({ ...currentState, selected: new Set() });
    };

    const selectOrUnselectAll = (): void => {
        if (currentState.selected.size > 0) {
            unselectAll();
        } else if (currentState.foodRows) {
            const ids = currentState.foodRows.map(food => food.id);
            const newSet = new Set() as Set<string>;
            ids.forEach(id => newSet.add(id));

            setCurrentState({ ...currentState, selected: newSet });
        }
    };

    const sortByName = (): void => {
        if (currentState.nameSort === 'asc') {
            setCurrentState({ ...currentState, nameSort: 'desc', foodRows: sortFoods(currentState.foodRows, 'asc') });
        } else {
            setCurrentState({ ...currentState, nameSort: 'asc', foodRows: sortFoods(currentState.foodRows, 'desc') });
        }
    };

    const sortByExp = (): void => {
        if (currentState.expSort === 'asc') {
            setCurrentState({ ...currentState, expSort: 'desc', foodRows: sortDates(currentState.foodRows, 'asc') });
        } else {
            setCurrentState({ ...currentState, expSort: 'asc', foodRows: sortDates(currentState.foodRows, 'desc') });
        }
    };

    const renderFoodRows = (): ReactElement => {
        const foodRows = currentState.foodRows;

        if (!foodData || foodRows === undefined) {
            return <div className="ft__loadingText"> Loading... </div>;
        }

        return (
            <div className="fridge__tableRows">
                {foodRows.map((food: Food) => (
                    <FoodRow
                        key={food.id}
                        food={food}
                        selectOrUnselectFood={() => selectOrUnselectFood(food.id)}
                        reloadFoodRow={reloadFoodRow}
                        isChecked={currentState.selected.has(food.id)}
                        isCollapsed={currentState.isCollapsed}
                        beingEdited={false}
                        setError={setError}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="ft">
                <FoodTableHeader
                    toggleSelection={selectOrUnselectAll}
                    isCollapsed={currentState.isCollapsed}
                    toggleCollapse={() => {
                        setCurrentState({ ...currentState, isCollapsed: !currentState.isCollapsed });
                    }}
                    sorts={{ nameSort: currentState.nameSort, expSort: currentState.expSort }}
                    doSorts={{ sortByName, sortByExp }}
                />

                {error && <ErrorDisplay errorMsg={error} />}
                {renderFoodRows()}
            </div>
        </>
    );
});
