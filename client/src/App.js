import logo from './logo.svg';
import './App.css';

function App() {
    const result = fetch('http://localhost:5000/books')
        .then((response) => {
            console.log("hello", response);
            return response.json();
        })
        .then((data) => {
            // Work with JSON data here
            console.log(data)
        })
        .catch((err) => {
            // Do something for an error here
            console.log("error", err);
        })
    console.log(result);

  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
