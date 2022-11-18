import React from "react";
import "../styles/AirportCard.css";

function AirportCard(props){

    return(
        <div className="card">
            <h2>{props.title}</h2>
            <label>Name <p>{props.name}</p></label>
            <label>ICAO Code <p>{props.icaoCode}</p></label>
            <label>Coordinates <p>{props.latitude} , {props.longitude}</p></label>
        </div>
    );
}

export default AirportCard;