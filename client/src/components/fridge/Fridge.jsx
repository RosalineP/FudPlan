import { useEffect, useState } from 'react';

import { getFoods } from '../../actions';

import { FridgeButtonGroup } from './TopButtonGroup';
import { FoodTable } from './FoodTable';

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
