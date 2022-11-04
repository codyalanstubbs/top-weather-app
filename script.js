const weatherIcon = document.querySelector(".icon");
const locationDiv = document.querySelector(".location");
const conditions = document.querySelector(".conditions");
const temperature = document.querySelector(".temperature");
const feels = document.querySelector(".feels");
const humidity = document.querySelector(".humid");
const lo = document.querySelector(".lo");
const hi = document.querySelector(".hi");
const windSpeed = document.querySelector(".windSpeed");
const windDirection = document.querySelector(".windDirection");
const locationSearch = document.querySelector("#search");
const submitBtn = document.querySelector("#submit");
const imperialBtn = document.querySelector("#imperial");
const metricBtn = document.querySelector("#metric");
let units = "imperial";

submitBtn.addEventListener("click", (e) => {
    getData(locationSearch.value, units);
})

metricBtn.addEventListener("click", (e) => {
    units = metricBtn.id;
    getData(locationSearch.value, units);
})

imperialBtn.addEventListener("click", (e) => {
    units = imperialBtn.id;
    getData(locationSearch.value, units);
})

getData("Harrisburg, Pennslyvania", "imperial");

async function getData(locationQuery, units) {
    try {
        locationQuery = locationQuery.replace(/ /g,'');
        const url = "https://api.openweathermap.org/data/2.5/weather?q="
            +locationQuery+"&units="+units+
            "&APPID=f7f9c4ef474adaa8f7584523bd3abfb9";
        
        const response = await fetch(url, {mode: 'cors'});
        const json = await response.json();

        const data = processData(json);
        displayData(data, units);
    } catch(error) {
        alert("Whoops! Try again!");
    }
}

function processData(json) {
    return {
        location: json.name,
        description: json.weather[0].description,
        icon: json.weather[0].icon,
        temp: json.main.temp.toFixed(1),
        hi: json.main.temp_max.toFixed(1),
        lo: json.main.temp_min.toFixed(1),
        feels: json.main.feels_like.toFixed(1),
        humid: json.main.humidity,
        wSpeed: json.wind.speed.toFixed(1),
        wDirection: json.wind.deg
    };
}

function displayData(data, units) {
    let tempUnits = getTempUnits(units);
    let speedUnits = getSpeedUnits(units);

    weatherIcon.src = "http://openweathermap.org/img/wn/"+data.icon+"@2x.png";
    locationDiv.textContent = data.location;
    conditions.textContent = capitalizeDescription(data.description);
    temperature.textContent = data.temp + "°" + tempUnits;
    feels.textContent = data.feels + "°" + tempUnits;
    humidity.textContent = data.humid + "%";
    lo.textContent = data.lo + "°" + tempUnits;
    hi.textContent = data.hi + "°" + tempUnits;
    windSpeed.textContent = data.wSpeed + " " + speedUnits;
    windDirection.textContent = data.wDirection + "°";
}

function capitalizeDescription(description) {
    const firstLetterCapitalized = description.charAt(0).toUpperCase();
    const remainingLetters = description.slice(1);
    return firstLetterCapitalized + remainingLetters;
}

function getTempUnits(units) {
    if (units === "imperial") {
        return "F";
    } else if (units === "metric") {
        return "C";
    }
}

function getSpeedUnits(units) {
    if (units === "imperial") {
        return "mph";
    } else if (units === "metric") {
        return "m/s";
    }
}