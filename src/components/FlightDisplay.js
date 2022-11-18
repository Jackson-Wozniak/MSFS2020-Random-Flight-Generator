import React from "react";
import AirportCard from "./AirportCard";
import FlightInfoCard from "./FlightInfoCard";
import "../styles/FlightDisplay.css"

function FlightDisplay(props){

    function backToHomepage(){
        window.location.reload();
    }

    return(
        <div className="flight-window">
            <div className="utils">
                <button className="reload-button" onClick={backToHomepage}>Go Back To Homepage</button>
            </div>
            <div className="flight-display">
                <AirportCard
                    title={"Departure Airport"}
                    airport={props.flight.departure}
                />

                <FlightInfoCard flight={props.flight} />

                <AirportCard
                    title={"Destination Airport"}
                    airport={props.flight.destination}
                />
            </div>
        </div>
    );
}

export default FlightDisplay;