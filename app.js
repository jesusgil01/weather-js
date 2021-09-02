const apiKey= "96f6ba150dbfde1782395bffef95d6a2";
const KELVIN = 273;

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    //App data
    const weather = {};

    weather.temperature = {
        unit: 'celsius'
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                    weather.description = data.weather[0].description;
                    weather.timezone = data.name;
                    weather.icon = data.weather[0].icon;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = weather.temperature.value;
                    //temperatureDescription.textContent = weather.description;
                    temperatureDescription.textContent = titleCase(weather.description);
                    locationTimezone.textContent = weather.timezone;
                    //Set Icon
                    setIcons(weather.icon, document.querySelector('.icon'));
                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = weather.temperature.value;
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = weather.temperature.value * 9/5 + 32;
                        }
                    });
                });  
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = iconName(icon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});


function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for(let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}

function iconName(iconID) {
    switch (iconID){
        case "01d":
            return "CLEAR_DAY";
            break;
        case "01n":
            return "CLEAR_NIGHT";
            break;
        case "02d":
            return "PARTLY_CLOUDY_DAY";
            break;
        case "03d":
            return "PARTLY_CLOUDY_DAY";
            break;
        case "02n":
            return "PARTLY_CLOUDY_NIGHT";
            break;
        case "03n":
            return "PARTLY_CLOUDY_NIGHT";
            break;
        case "04d":
            return "CLOUDY";
            break;
        case "04n":
            return "CLOUDY";
            break;
        case "09d":
            return "RAIN";
            break;
        case "09n":
            return "RAIN";
            break;
        case "11d":
            return "RAIN";
            break;
        case "11n":
            return "RAIN";
            break;
        case "10d":
            return "SLEET";
            break;
        case "10n":
            return "SLEET";
            break;
        case "13d":
            return "SNOW";
            break;
        case "13n":
            return "SNOW";
            break;
        case "50d":
            return "WIND";
            break;
        case "50n":
            return "WIND";
            break;
        default:
            return " ";   
    }
}