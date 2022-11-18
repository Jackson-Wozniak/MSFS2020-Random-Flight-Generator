export class FlightParameters{
    maxFlightTime;
    maxFlightDistance;
    continentOfDeparture;
    airportSize;

    constructor(maxFlightTime, maxFlightDistance, continentOfDeparture, airportSize){
        this.maxFlightTime = maxFlightTime;
        this.maxFlightDistance = maxFlightDistance;
        this.continentOfDeparture = continentOfDeparture;
        this.airportSize = airportSize;
    }

    airportChoicesAreNotAny(){
        return this.continentOfDeparture !== -1 || this.airportSize !== -1 ? true : false;
    }
}

export class Flight{
    departure;
    destination;
    plane;
    distance;
    time;
    formattedTime;

    constructor(airport1, airport2, plane){
      this.departure = airport1;
      this.destination = airport2;
      this.plane = plane;
      this.distance = this.calculateDistance();
      this.time = this.calculateFlightHours();
      this.formattedTime = this.convertHoursToHHmm();
    }

    calculateDistance() {
        function toRad(x) {
          return x * Math.PI / 180;
        }
    
        var dLat = toRad(this.destination.latitude - this.departure.latitude);
        var dLon = toRad(this.destination.longitude - this.departure.longitude)
    
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(this.departure.latitude)) * 
          Math.cos(toRad(this.destination.latitude)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
        return (12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 0.621371;
    }

    calculateFlightHours(){
        let planeSpeedInMph = this.plane.speedInKnots * 1.15077945;
        return Math.round((this.distance/planeSpeedInMph) * 100.00) / 100.00;
    }
    
    convertHoursToHHmm() {
        let flightMinutes = this.time * 60;
        let hours = flightMinutes / 60;
        let minutes = flightMinutes % 60;
        return Math.floor(hours) + ":" + (Math.round(minutes) < 10 ? "0" + Math.round(minutes) : Math.round(minutes)) + ":00";
    }

    validateFlight(flightParameters){
        if(this.distance > this.plane.rangeInMiles){
            return false;
        }
        if(flightParameters.maxFlightTime < this.time && flightParameters.maxFlightTime !== -1){
            return false;
        }
        if(flightParameters.maxFlightDistance < this.distance && flightParameters.maxFlightDistance !== -1){
            return false;
        }
        return true;
    }
}

export class Airport{
    name;
    size;
    icaoCode;
    latitude;
    longitude;
    continent;
    country;

    constructor(data){
      this.icaoCode = data[0];
      this.size = data[1];
      this.name = data[2];
      this.latitude = data[3];
      this.longitude = data[4];
      this.continent = data[5];
      this.country = data[6];
    }
}

export class Plane {
    name;
    speedInKnots;
    rangeInMiles;
    airplaneType;
    
    constructor(plane){
        this.name = plane.name;
        this.speedInKnots = plane.speedInKnots;
        this.rangeInMiles = plane.rangeInMiles;
        this.airplaneType = plane.airplaneType;
    }
}