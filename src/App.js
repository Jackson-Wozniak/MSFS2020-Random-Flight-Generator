import './App.css';
import { useState, useEffect, useRef } from "react";
import Papa from 'papaparse';
import FlightDisplay from './components/FlightDisplay';
import { Flight, Airport, FlightParameters, Plane } from './classes/Flight';

function App() {

  const airports = [];
  const planes = [];

  useEffect(() => {
    readTextFile();
  }, []);

  const [flight, setFlight] = useState(null);
  const [flightParameters, setFlightParameters] = useState(new FlightParameters(-1, -1, -1, -1));

  const readTextFile = () => {
    if(airports.length > 1){
      return;
    }
    fetch("https://raw.githubusercontent.com/Jackson-Wozniak/MSFS2020-Random-Flight-Generator/main/airports.csv")
      .then(res => res.text())
      .then(v => Papa.parse(v))
      .then(data => {
        data.data.forEach(airport => {
          //map array index from csv to new Airport object
          airports.push(new Airport(airport));;
        });
        console.log(airports.length);
      })
      .catch(() => {
        alert("Cannot get airport data to create flight");
      });

    fetch("https://raw.githubusercontent.com/Jackson-Wozniak/MSFS2020-Random-Flight-Generator/main/planes.csv")
      .then(res => res.text())
      .then(v => Papa.parse(v))
      .then(data => {
        data.data.forEach(plane => {
          //map array index from csv to new plane object
          planes.push(new Plane(plane));;
        });
        console.log(planes.length);
      })
      .catch(() => {
        alert("Cannot get plane data to create flight");
      });
  }

  const createFlight = (e) => {
    e.preventDefault();
    //if continent or airport size in flight parameters are not any (-1), filter airports 
    //to only include those that follow flight parameters
    if(airports.size <= 1){
      readTextFile();
    }
    let airportArr = flightParameters.airportChoicesAreNotAny() ? filteredAirports() : airports;
    let airport1 = airportArr[Math.floor(Math.random()*airportArr.length)];
    let airport2 = airportArr[Math.floor(Math.random()*airportArr.length)];
    let plane = planes[Math.floor(Math.random()*planes.length)];
    let flight = new Flight(airport1, airport2, plane);
    while(true){
      if(flight.validateFlight(flightParameters)){
        setFlight(flight);
        break;
      }
      airport1 = airportArr[Math.floor(Math.random()*airportArr.length)];
      airport2 = airportArr[Math.floor(Math.random()*airportArr.length)];
      flight = new Flight(airport1, airport2, plane);
    }
  }

  function filteredAirports(){
    if(flightParameters.airportSize === -1){
      return airports.filter(airport => airport.continent === flightParameters.continentOfDeparture);
    }
    if(flightParameters.continentOfDeparture === -1){
      return airports.filter(airport => airport.size === flightParameters.airportSize);
    }

    return airports.filter(function (airport) {
      return airport.size === flightParameters.airportSize &&
             airport.continent === flightParameters.continentOfDeparture;
    });
  }

  if(flight == null){
    return (
      <div className="App">
        <form onSubmit={createFlight} className="flight-form">
          <h2>Choose Your Flight Parameters</h2>
          <div className="select">
            <select onChange={(e) => flightParameters.maxFlightTime = e.target.value}>
              <option value="-1">Any Time</option>
              <option value="1">1 Hour</option>
              <option value="3">3 Hours</option>
              <option value="5">5 Hours</option>
            </select>
          </div>
          <div className="select">
            <select onChange={(e) => flightParameters.continentOfDeparture = e.target.value}>
              <option value="-1">Any Continent</option>
              <option value="NA">North America</option>
              <option value="SA">South America</option>
              <option value="AF">Africa</option>
              <option value="AS">Asia</option>
              <option value="EU">Europe</option>
              <option value="OC">Oceania</option>
            </select>
          </div>
          <div className="select">
            <select onChange={(e) => flightParameters.airportSize = e.target.value}>
              <option value="-1">Any Airport</option>
              <option value="large_airport">Large Airports</option>
              <option value="medium_airport">Medium Airports</option>
              <option value="small_airport">Small Airports</option>
            </select>
          </div>
          <button action="submit" className="submit-flight">Generate Flight</button>
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
