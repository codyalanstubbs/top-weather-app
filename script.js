const weatherIcon = document.querySelector(".icon");
const locationDiv = document.querySelector(".location");
const conditions = document.querySelector(".conditions");
const feels = document.querySelector(".feels");
const humidity = document.querySelector(".humid");
const lo = document.querySelector(".lo");
const hi = document.querySelector(".hi");
const windSpeed = document.querySelector(".windSpeed");
const windDirection = document.querySelector(".windDirection");
const locationSearch = document.querySelector("#search");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", (e) => {
    getData(locationSearch.value);
})

getData("Harrisburg, Pennslyvania");

async function getData(locationQuery) {
    try {
        locationQuery = locationQuery.replace(/ /g,'');
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+locationQuery+"&units=imperial&APPID=f7f9c4ef474adaa8f7584523bd3abfb9";
        
        const response = await fetch(url, {mode: 'cors'});
        const json = await response.json();

        const data = processData(json);
        displayData(data);
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

function displayData(data) {
    weatherIcon.src = "http://openweathermap.org/img/wn/"+data.icon+"@2x.png";
    locationDiv.textContent = data.location;
    conditions.textContent = capitalizeDescription(data.description) + " & " + data.temp + "°F";;
    feels.textContent = "Feels like: " + data.feels + "°F";
    humidity.textContent = "Humidity: " + data.humid + "%";
    lo.textContent = "LO: " + data.lo + "°F";
    hi.textContent = "HI: " + data.hi + "°F";
    windSpeed.textContent = "Wind Speed: " + data.wSpeed + " MPH";
    windDirection.textContent = "Wind Direction: " + data.wDirection + "°";
}

function capitalizeDescription(description) {
    const firstLetterCapitalized = description.charAt(0).toUpperCase();
    const remainingLetters = description.slice(1);
    return firstLetterCapitalized + remainingLetters;
}