import {FC, memo, ReactNode, useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';

import { getFoods } from '../../actions';

import { Food } from '../../types';

import { FoodRow } from './FoodRow';
import { FoodActionButtons } from './FoodActionButtons';
import {FoodTableHeader} from "./FoodTableHeader";

const classNames = require('classnames');

// todo: Make use of errorMsg, and then style
interface ErrorProps {
    errorMsg: string;
}
const ErrorDisplay: FC<ErrorProps> = memo(props => {
    const { errorMsg } = props;

    return (
        <>
            <div className="error__display">
                <FontAwesomeIcon icon={faSkullCrossbones} size="10x" />
                <div className="error__text">
                    <div> öops; please refresh </div>
                </div>
            </div>
        </>
    );
});

export const FoodTable = memo((props: any) => {
    const { compartmentSelection, error } = props;
    const [foodData, setFoodData] = useState<any>(undefined);
    const [foodDisplay, setFoodDisplay] = useState<any>(undefined);

    useEffect(() => {
        (async () => {
            try {
                const foods = await getFoods();
                setFoodData(foods);
            } catch (e) {}
        })();
    }, []);

    useEffect(() => {
        if (foodData) {
            const foodRows = foodData.filter((food: Food) => food.compartment === compartmentSelection);
            setFoodDisplay(foodRows);
        }
    }, [compartmentSelection, foodData]);

    const renderFoodRows = () => {
        if (!foodDisplay) {
            return <div className="ft__loadingText"> Loading... </div>;
        }

        return (
            <div className="fridge__tableRows">
                {foodDisplay &&
                    foodDisplay.map((food: Food) => (
                        <FoodRow
                            key={food.id}
                            id={food.id}
                            onClickReportId={() => {}}
                            // loadFoods={loadFoods}
                            // setError={setError}
                            // isChecked={checkedFoods.has(food.id)}
                            iconCell={food.icon}
                            nameCell={food.name}
                            expiryCell={food.expiry}
                            quantityCell={food.quantity}
                            unitCell={food.unit}
                            food={food}
                            isCollapsed={false}
                            beingEdited={false}
                        />
                    ))}
            </div>
        );
    };

    return (
        <>
            <div className="ft">
                <FoodTableHeader isCollapsed={false} toggleCollapse={() => {}} />

                {error && <ErrorDisplay errorMsg={error} />}
                {!error && renderFoodRows()}
            </div>
        </>
    );
});
