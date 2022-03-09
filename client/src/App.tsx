import './App.css';
import './styles/SideNav.css';
import './styles/Fridge.css';

import React, { FC, memo, useState } from 'react';

import { NavBar } from './components/NavBar';
import { MainView } from './components/MainView';

const App: FC = memo(() => {
    const [viewType, setViewType] = useState<string>('fridge');

    return (
        <div className="App">
            <NavBar setViewType={setViewType} viewType={viewType} />
            <MainView viewType={viewType} />
        </div>
    );
});

export default App;
