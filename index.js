const cityInput = document.querySelector(".city-input")
const searchBtn = document.querySelector(".search-btn")
let cityOptions = document.querySelector(".city-options")
let cityInfo = document.querySelectorAll(".city-info")
let forecastSection = document.querySelector(".forecast")
let currentWeather = document.querySelector(".current-weather")

let cityInformations 
let forecast
let generalWeather

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const date = new Date()
const month = months[date.getMonth()]
const day = date.getDate()
const weekday = weekdays[date.getDay()]
const hours = date.getHours()
const mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
let weather = {
    key : "8e29deb48c288702515835df3a389ef3",
}

let currentCity = {
    city: "",
    lon: "",
    lat: "",
    state: ""
}

searchBtn.addEventListener('click',()=>{search()})
function search(){
    cityOptions.textContent = ""
    let city = cityInput.value
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weather.key}`)
        .then(res => res.json())
        .then(data => cityInformations = data)
        .then(() => console.log(cityInformations))
        .then(() =>{
            for(let i=0; i<cityInformations.length; i++){
                cityOptions.innerHTML += `<div class="city-info">
                <h1 class="city">${cityInformations[i].name}</h1>                
                ${cityInformations[i].state ? `<h1>, </h1><h1 class="state">${cityInformations[i].state}</h1>` : ""}               
                <h1 class="lat">${cityInformations[i].lat}</h1>
                <h1 class="lon">${cityInformations[i].lon}</h1>
                </div>
                `
            }
        })  
}

cityOptions.addEventListener('click', e => {
    // console.log(e.target.parentNode)
    const selectedOption = e.target
    currentCity.city = selectedOption.textContent
    currentCity.lat = selectedOption.parentNode.querySelector(".lat").textContent
    currentCity.lon = selectedOption.parentNode.querySelector(".lon").textContent
    currentCity.state = selectedOption.parentNode.querySelector(".state") ? selectedOption.parentNode.querySelector(".state").textContent : ""
    cityOptions.innerHTML = ""

    console.log(selectedOption.parentNode)
    console.log(currentCity)
    
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCity.lat}&lon=${currentCity.lon}&appid=${weather.key}`)
    // .then(response => response.json())
    // .then(data => generalWeather = data)
    // .then(data => console.log(data));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCity.lat}&lon=${currentCity.lon}&appid=${weather.key}&units=metric`)
    .then(response => response.json())
    .then(data => forecast = data)
    .then(data => console.log(data))
    .then(()=>{
        currentWeather.innerHTML = `
    <h1>${currentCity.city}</h1>
    ${currentCity.state ? `<h2>${currentCity.state}</h2>` : ""} 
    <h3>${weekday}, ${month} ${day}   ${hours}:${mins}</h3>
    <div class="img"></div>
    <h1>${forecast.list[0].main.temp}<span>°C</span></h1>
    <h2>${forecast.list[0].weather[0].main}</h2>
    <div class="more-info">
        <div class="pop">
            <h2>${forecast.list[0].main.feels_like}<span>°C</span></h2>
            <h2>Feels like</h2>
        </div>
        <div class="pop">
            <h2>${forecast.list[0].pop * 100}%</h2>
            <h2>Precipitation</h2>
        </div>
        <div class="pop">
            <h2>${forecast.list[0].wind.speed}m/s</h2>
            <h2>Wind</h2>
        </div>
    </div>
    `
    console.log(forecast)
    })

})



