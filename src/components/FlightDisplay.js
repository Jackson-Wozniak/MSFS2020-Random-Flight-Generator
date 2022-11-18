import React from "react";
import AirportCard from "./AirportCard";
import "../styles/FlightDisplay.css"

function FlightDisplay(props){

    return(
        <div className="flight-display">
            <AirportCard
                title={"Departure"}
                name={props.flight.departure.name}
                icaoCode={props.flight.departure.icaoCode} 
                latitude={props.flight.departure.latitude} 
                longitude={props.flight.departure.longitude}
            />

            <AirportCard
                title={"Destination"}
                name={props.flight.destination.name}
                icaoCode={props.flight.destination.icaoCode} 
                latitude={props.flight.destination.latitude} 
                longitude={props.flight.destination.longitude}
            />
        </div>
    );
}

export default FlightDisplay;