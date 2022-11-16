import './App.css';
import { useState } from "react";
import Papa from 'papaparse';

function App() {

  const [maxFlightTime, setMaxFlightTime] = useState(-1);

  const airports = [];

  const formatter = Intl.NumberFormat("en-US", {
    maximumFractionDigits : 2
  });

  class Airport{
    name;
    size;
    icaoCode;
    latitude;
    longitude;
    continent;
    country;

    constructor(data){
      this.name = data[0];
      this.size = data[1];
      this.icaoCode = data[2];
      this.latitude = data[3];
      this.longitude = data[4];
      this.continent = data[5];
      this.country = data[6];
    }
  }

  class Flight{
    departure;
    destination;
    distance;
    time;

    constructor(airport1, airport2){
      this.departure = airport1;
      this.destination = airport2;
      let tempDistance = haversineDistance(airport1, airport2);
      this.distance = formatter.format(tempDistance);
      this.time = convertHoursToHHmm(calculateFlightHours(150, tempDistance));
    }
  }

  const readTextFile = (e) => {
    e.preventDefault();
    let startDate = new Date();
    if(airports.length > 1){
      console.log(airports.length);
      createFlight();
      let endDate   = new Date();
      console.log((endDate.getTime() - startDate.getTime()) / 1000);
      console.log(maxFlightTime);
      return;
    }
    fetch("https://raw.githubusercontent.com/Jackson-Wozniak/MSFS2020-Career-Mode/main/Text_Files/airports_full.csv")
    .then(res => res.text())
    .then(v => Papa.parse(v))
    .then(data => {
      data.data.forEach(airport => {
        map(airport);
      })
      createFlight();
      let endDate   = new Date();
      console.log((endDate.getTime() - startDate.getTime()) / 1000);
      console.log(maxFlightTime);
    });
  }

  //map array index from csv to new Airport object
  function map(data){
    airports.push(new Airport(data));
  }

  function createFlight(){
    var airport1 = airports[Math.floor(Math.random()*airports.length)];
    var airport2 = airports[Math.floor(Math.random()*airports.length)];
    console.log(new Flight(airport1, airport2));
  }

  function haversineDistance(coords1, coords2) {

  function toRad(x) {
    return x * Math.PI / 180;
  }

  var dLat = toRad(coords2.latitude - coords1.latitude);
  var dLon = toRad(coords2.longitude - coords1.longitude)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.latitude)) * 
    Math.cos(toRad(coords2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return (12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 0.621371;
}

function calculateFlightHours(planeSpeedInKnots, flightDistanceInMiles){
    let planeSpeedInMph = planeSpeedInKnots * 1.15077945;
    return Math.round((flightDistanceInMiles/planeSpeedInMph) * 100.00) / 100.00;
}

function convertHoursToHHmm(flightHours) {
    let flightMinutes = flightHours * 60;
    let hours = flightMinutes / 60;
    let minutes = flightMinutes % 60;
    return Math.floor(hours) + ":" + (Math.round(minutes) < 10 ? "0" + Math.round(minutes) : Math.round(minutes));
}

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
}

export default App;
