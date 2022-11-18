import React from "react";
import "../styles/AirportCard.css";

function AirportCard(props){

    return(
        <div className="card">
            <h2>{props.title}</h2>
            <hr />
            <label>Airport Name <p>{props.airport.name}</p></label>
            <label>ICAO Code <p>{props.airport.icaoCode}</p></label>
            <label>Coordinates <p>{props.airport.latitude} , {props.airport.longitude}</p></label>
            <label>Location <p>{props.airport.country},{props.airport.continent}</p></label>
            <label>Type <p>{props.airport.size}</p></label>
        </div>
    );
}

export default AirportCard;