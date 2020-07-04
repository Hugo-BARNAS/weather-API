// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


// CREATION DES ELEMENTS ET ASSOCIATION AUX SELECTEURS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const localisationsElement = document.querySelector("location p");
const notificationElement = document.querySelector(".notification");

// APP DATA

//CREATION DE L'OBJET WEATHER   
const weather = {};

weather.temperature = { unit: "celsius" };

//CONSTANTE ET VARS

const KELVIN = 273;

//API
const Key = "82005d27a116c2880c8f0fcb866998a0";

// VERIFICATION SI LE NAVIGATEUR SUPPORTE LA GÉOLOCALISATION OU PAS
/* SI la géolocalisation est disponible */
if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(success, error) //la méthode Geolocation.getCurrentPosition() fournit la position actuelle de l'appareil.
} else {
    /* SI la géolocalisation n'est pas disponible et on prévoit un message d'erreur dans un block prévu à cet effet.*/
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p";
}


//MISE EN PLACE DE LA POSITION DU USER
function setPosition(position) {
    let latitude = position.coord.lat;
    let longitude = position.coord.lon;

    getWeather(latitude, longitude);

    console.log(position);
    
}

// MONTRER UNE MESSAGE D'ERREUR QUAND IL Y A UN PROBLÈME AVEC LA GÉOLOCATION

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}


//OBTENIR LE TEMPS A PARTIR DE L'APPI FOURNI

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
      exclude={part}&lang=fr&appid=${Key}`;
    console.log("TEST DE L API =>" + api);

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
    //IMAGES DU TEMPS 
    function displayWeather() {
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        descElement.innerHTML = weather.description;
        localisationsElement.innerHTML = `${weather.country}, ${weather.city}`;
    }
}

// CONVERTIR LA TEMPERATURE EN CELCIUS ET EN FARHENHEIT

function celsiusToFarenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// MODIFICATION DE LA TEMPERATURE  AU CLICK

tempElement.addEventListener("click", function () {

    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === "celsius") {
        let farenheit = celsiusToFarenheit(weather.temperature.value);
        console.log(farenheit);
        
        let farenheit = Math.floor(farenheit);
        tempElement.innerHTML = `${farenheit}°<span>F</span>`;
        weather.temperature.unit = "farenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
}



)