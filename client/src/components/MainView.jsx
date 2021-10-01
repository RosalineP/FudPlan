import React from 'react';

import { Fridge } from './fridge/Fridge';

export const MainView = props => {
    const view = props.viewType;

    if (view === 'fridge') {
        return <Fridge />;
    }
    if (view === 'shop') {
        return <div className="placeholder"> Füd's Shöp section is coming soon! </div>;
    }
    if (view === 'recipe') {
        return <div className="placeholder"> Füd's Rëcipe section is coming soon! </div>;
    }
};
