import React, { FC, memo } from 'react';

import { Fridge } from './fridge/Fridge';
import { Recipe } from './recipe/Recipe';
import { Info } from './Info';

interface Props {
    viewType: string;
}

export const MainView: FC<Props> = memo(props => {
    const { viewType } = props;

    if (viewType === 'shop') {
        return <div className="placeholder"> Füd's Shöp section is coming soon! </div>;
    }
    if (viewType === 'recipe') {
        return <Recipe />;
    }
    if (viewType === 'fridge') {
        return <Fridge />;
    }

    return <Info />;
});
