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
            <label>Time <p>{props.flight.formattedTime}</p></label>
        </div>
    );
}

export default FlightInfoCard;