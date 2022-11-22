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
          planes.push(new Plane(plane));
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
    let airportArr = flightParameters.airportSize !== -1 ? filteredAirports() : airports;

    let airport1 = airportArr[Math.floor(Math.random()*airportArr.length)];
    let airport2 = airportArr[Math.floor(Math.random()*airportArr.length)];

    let plane = findRandomPlaneByType();

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

  function findRandomPlaneByType(){
    if(flightParameters.planeType === -1){
      return planes[Math.floor(Math.random()*planes.length)];
    }
    while(true){
      let plane = planes[Math.floor(Math.random()*planes.length)];
      if(plane.airplaneType.toLowerCase() === flightParameters.planeType.toLowerCase()){
        return plane;
      }
    }
  }

  function filteredAirports(){
    if(flightParameters.airportSize !== -1){
      return airports.filter(airport => airport.size === flightParameters.airportSize);
    }else{
      return airports;
    }
  }

  if(flight == null){
    return (
      <div className="App">
        <form onSubmit={createFlight} className="flight-form">
          <h2>Choose Your Flight Parameters</h2>
          <div className="select">
            <select onChange={(e) => flightParameters.maxFlightTime = e.target.value}>
              <option value="-1">Any Duration</option>
              <option value="1">1 Hour</option>
              <option value="3">3 Hours</option>
              <option value="5">5 Hours</option>
            </select>
          </div>
          <div className="select">
            <select onChange={(e) => flightParameters.planeType = e.target.value}>
              <option value="-1">Any Plane Type</option>
              <option value="propeller">Propeller Planes</option>
              <option value="jet">Jets</option>
              <option value="airliner">Airliners</option>
              <option value="turboprop">TurboProps</option>
            </select>
          </div>
          <div className="select">
          <select onChange={(e) => flightParameters.airportSize = e.target.value}>
              <option value="-1">Any Airport Size</option>
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
