import './App.css';
import { useState } from "react";
import Papa from 'papaparse';
import FlightDisplay from './components/FlightDisplay';
import { Flight, Airport } from './classes/Flight';

function App() {

  const [maxFlightTime, setMaxFlightTime] = useState(-1);

  const airports = [];

  const [flight, setFlight] = useState(null);

  const readTextFile = (e) => {
    e.preventDefault();
    if(airports.length > 1){
      console.log(airports.length);
      createFlight();
      return;
    }
    fetch("https://raw.githubusercontent.com/Jackson-Wozniak/MSFS2020-Random-Flight-Generator/main/airports.csv")
      .then(res => res.text())
      .then(v => Papa.parse(v))
      .then(data => {
        data.data.forEach(airport => {
          //map array index from csv to new Airport object
          airports.push(new Airport(airport));;
        })
        createFlight();
      });
  }

  function createFlight(){
    let airport1 = airports[Math.floor(Math.random()*airports.length)];
    let airport2 = airports[Math.floor(Math.random()*airports.length)];
    setFlight(new Flight(airport1, airport2));
  }

  if(flight == null){
    return (
      <div className="App">
        <form onSubmit={readTextFile}>
          <select onChange={(e) => setMaxFlightTime(e.target.value)}>
            <option value="-1">Any Time</option>
            <option value="1">1 Hour</option>
            <option value="3">3 Hours</option>
            <option value="5">5 Hours</option>
          </select>
          <button action="submit">Generate Flight</button>
        </form>
      </div>
    );
  }else{
    return(
      <div className="App">
        <FlightDisplay flight={flight} />
      </div>
    );
  }
}

export default App;
