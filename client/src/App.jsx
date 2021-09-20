import './App.css';
import React, { useState } from 'react';
import { SideNav } from './Components/SideNav';
import { MainView } from './Components/MainView';

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
