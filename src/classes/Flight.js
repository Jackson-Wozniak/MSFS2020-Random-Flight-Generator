export class Flight{
    departure;
    destination;
    distance;
    time;
    formattedTime;

    constructor(airport1, airport2){
      this.departure = airport1;
      this.destination = airport2;
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
        let planeSpeedInMph = 150 * 1.15077945;
        return Math.round((this.distance/planeSpeedInMph) * 100.00) / 100.00;
    }
    
    convertHoursToHHmm() {
        let flightMinutes = this.time * 60;
        let hours = flightMinutes / 60;
        let minutes = flightMinutes % 60;
        return Math.floor(hours) + ":" + (Math.round(minutes) < 10 ? "0" + Math.round(minutes) : Math.round(minutes));
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