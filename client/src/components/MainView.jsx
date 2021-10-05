import React from 'react';

import { Fridge } from './fridge/Fridge';
import { Recipe } from './recipe/Recipe';

export const MainView = props => {
    const view = props.viewType;

    if (view === 'fridge') {
        return <Fridge />;
    }
    if (view === 'shop') {
        return <div className="placeholder"> Füd's Shöp section is coming soon! </div>;
    }
    if (view === 'recipe') {
        return <Recipe />;
    }
};
