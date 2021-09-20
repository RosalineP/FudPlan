import './App.css';
import React, {useState} from 'react';
import {SideNav} from "./Components/SideNav";
import {MainView} from "./Components/MainView";

function App() {
    // scrap -------
    // const result = fetch('http://localhost:5000/books')
    //     .then((response) => {
    //         console.log("hello", response);
    //         return response.json();
    //     })
    //     .then((data) => {
    //         // Work with JSON data here
    //         console.log(data)
    //     })
    //     .catch((err) => {
    //         // Do something for an error here
    //         console.log("error", err);
    //     })
    // console.log(result);
    // --------
    const [viewType, setViewType] = useState("fridge");


  return (
    <div className="App">
        <SideNav setViewType={setViewType}/>
        <MainView viewType={viewType} />
    </div>
  );
}

export default App;
