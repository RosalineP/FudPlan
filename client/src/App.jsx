import './App.css';
import React, { useState } from 'react';

import { SideNav } from './components/SideNav';
import { MainView } from './components/MainView';

function App() {
    const [viewType, setViewType] = useState('fridge');

    return (
        <div className="App">
            <SideNav setViewType={setViewType} />
            <MainView viewType={viewType} />
        </div>
    );
}

export default App;
