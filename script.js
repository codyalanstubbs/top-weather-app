async function getData(location) {
    try {
        location = location.replace(/ /g,'');
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=f7f9c4ef474adaa8f7584523bd3abfb9";
        console.log(url);
        const response = await fetch(url, {mode: 'cors'});
        const json = await response.json();
        console.log(json);
    } catch(error) {
        console.log("Error: ", error);
    }
}

getData("Harrisburg, Pennslyvania");