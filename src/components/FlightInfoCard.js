import React from "react";
import "../styles/AirportCard.css";

function FlightInfoCard(props){

    const formatter = Intl.NumberFormat("en-US", {
        maximumFractionDigits : 2
    });

    return(
        <div className="card">
            <h2>Flight Info</h2>
            <hr />
            <label>Distance <p>{formatter.format(props.flight.distance)} miles</p></label>
            <label>Duration <p>{props.flight.formattedTime}</p></label>
            <label>Plane<p>{props.flight.plane.name}</p></label>
            <label>Speed <p>{props.flight.plane.speedInKnots} knots</p> </label>
        </div>
    );
}

export default FlightInfoCard;