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

const regions = new Intl.DisplayNames(['en'], {type: 'region'});

function getContinent(code){
    switch(code){
        case "NA":
            return "North America";
        case "SA":
            return "South America";
        case "AS":
            return "Asia";
        case "AF":
            return "Africa";
        case "EU":
            return "Europe";
        case "OC":
            return "Oceania";
        default:
            return code;                        
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
      this.continent = getContinent(data[5]);
      this.country = country[data[6]];
    }
}

export class Plane {
    name;
    speedInKnots;
    rangeInMiles;
    airplaneType;

    constructor(plane){
        this.name = plane[0];
        this.speedInKnots = plane[1];
        this.rangeInMiles = plane[2];
        this.airplaneType = plane[4];
    }
}

let country = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}