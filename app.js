let apiKey = `5863935ee9cca4c02ed68203f807c65b`;

// getCurrentPosition()

// TIME AND DATE
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let currentDay = days[currentTime.getDay()];
let day = document.querySelector(".current-weekday");
day.innerHTML = currentDay;

let dayInMonth = currentTime.getDate();
let currentMonth = months[currentTime.getMonth()];
let date = document.querySelector(".date");
date.innerHTML = currentMonth + " " + dayInMonth;

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let time = document.querySelector(".current-time");
time.innerHTML = hours + ":" + minutes;


// SEARCH
function searchCity(event) {
    event.preventDefault();
    currentCity.innerHTML = cityInput.value;
    getWeatherFromSearch(cityInput.value);
    cityInput.value = " ";
}
let searchButton = document.querySelector("#btn-search");
let cityInput = document.querySelector("#city-input");
let currentCity = document.querySelector(".current-city");
let currentTemperature = document.querySelector(".current-temperature");

searchButton.addEventListener("click", searchCity);

// CURRENT LOCATION
let currentLocationButton = document.querySelector("#btn-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
let city = document.querySelector("#current-city");
// city.innerHTML = response.data.name;

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(getWeatherFromLocation);
}

// WEATHER

function getWeatherFromLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; 
    axios.get(apiUrl).then(showWeather);
}

getWeatherFromSearch('kosice')

function getWeatherFromSearch(city) {
    // let apiKey = `5863935ee9cca4c02ed68203f807c65b`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperature;
    let city = document.querySelector(".current-city");
    city.innerHTML = response.data.name;
    let weatherDescription = document.querySelector(".description");
    weatherDescription.innerHTML = response.data.weather[0].description;
    // console.log(response.data.weather[0].description);

    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = response.data.wind.speed
    console.log(response)

    let weatherIcon = document.querySelector(".current-weather-icon img")
    weatherIcon.src = `icons/${response.data.weather[0].icon}.svg`
    getForecast(response.data.coord)

    document.querySelector(".current-data-wrapper").style.display = 'flex';
}


// FORECAST

function getForecast(coordinates) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }   

function displayForecast(response) {
    console.log(response)
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = "";

    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
            forecastHTML = 
            forecastHTML + 
            `
            <div class="forecast" id="forecast">
            <div class="day-forecast">
                <img src="icons/${day.weather[0].icon}.svg">
                <div class="temperature-wrapper">
                    <div class="day-temperature-wrapper"><span class="day-temperature" id="day-temperature-0">${Math.round(day.temp.max)}<span>
                        ° </div> 
                        <span class="pipe">|</span> 
                    <div class="night-temperature-wrapper">
                        <span class="night-temperature" id="night-temperature-0">${Math.round(day.temp.min)}</span>
                        °
                    </div> 
                </div>
                <div class="day-name" id="day-name-0">${formatDay(day.dt)}</div>
            </div>
        </div>
        `;
        }
    });

        forecastElement.innerHTML = forecastHTML;
}

function formatDay (timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}



