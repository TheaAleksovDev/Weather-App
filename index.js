const cityInput = document.querySelector(".city-input")
const searchBtn = document.querySelector(".search-btn")
let cityOptions = document.querySelector(".city-options")
let cityInfo = document.querySelectorAll(".city-info")
let forecastSection = document.querySelector(".forecast")
let currentWeather = document.querySelector(".current-weather")
let dayForecast = document.querySelector(".day-forecast")

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
let newDaysArr = [] 
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
        console.log(forecast.list[0].weather[0].icon)
        const tempDesc = forecast.list[0].weather[0].main
        currentWeather.innerHTML = `
    <h1 class="city">${currentCity.city}</h1>
    ${currentCity.state ? `<h2 class="state">${currentCity.state}</h2>` : ""} 
    <h3 class="time">${weekday}, ${month} ${day}   ${hours}:${mins}</h3>
    <div class="imp">
        <div class="img">${pickIcon(forecast.list[0].weather[0].icon)}<div>
        <h1 class="temp">${Math.round(forecast.list[0].main.temp)}<span class="cels">°C</span></h1>
    </div>
    <h2 class="temp-desc">${forecast.list[0].weather[0].main}</h2>
    <div class="more-info">
        <div class="pop feels-like">
            <h2 class="txt-tag">${Math.round(forecast.list[0].main.feels_like)}<span>°C</span></h2>
            <h2 class="tag">Feels like</h2>
        </div>
        <div class="pop pop">
            <h2 class="txt-tag">${forecast.list[0].main.humidity}<span>%</span></h2>
            <h2 class="tag">Humidity</h2>
        </div>
        <div class="pop wind">
            <h2 class="txt-tag">${forecast.list[0].wind.speed}<span>m/s</span></h2>
            <h2 class="tag">Wind</h2>
        </div>
    </div>
    `
    console.log(forecast)
    })
    // .then(()=>{
    //     forecast.innerHTML = ""
    //           forecastSection.innerHTML += `<div class="day-section">
    //     <div class="one-day day1">
    //         <h2>${weekdays[date.getDay() +1]>7 ? 0 : weekdays[date.getDay() +1]}, ${month} ${day}</h2>
    //         <h1>${Math.floor(forecast.list[2].main.temp_min)}<span>°C</span> / ${Math.ceil(forecast.list[2].main.temp_max)}<span>°C</span></h1>
    //     </div>          
    //     </div>`
    //           forecastSection.innerHTML += `<div class="day-section">
    //     <div class="one-day day2">
    //         <h2>${weekdays[date.getDay() +2]>7 ? 0 : weekdays[date.getDay() +2]}, ${month} ${day}</h2>
    //         <h1>${Math.floor(forecast.list[2].main.temp_min)}<span>°C</span> / ${Math.ceil(forecast.list[2].main.temp_max)}<span>°C</span></h1>
    //     </div>          
    //     </div>`
    //           forecastSection.innerHTML += `<div class="day-section">
    //     <div class="one-day day3">
    //         <h2>${weekdays[date.getDay() +3]>7 ? 0 : weekdays[date.getDay() +3]}, ${month} ${day}</h2>
    //         <h1>${Math.floor(forecast.list[3].main.temp_min)}<span>°C</span> / ${Math.ceil(forecast.list[3].main.temp_max)}<span>°C</span></h1>
    //     </div>  `
    //              forecastSection.innerHTML += `<div class="day-section">
    //     <div class="one-day day4">
    //         <h2>${weekdays[date.getDay() +4]>7 ? 0 : weekdays[date.getDay() +4]}, ${month} ${day}</h2>
    //         <h1>${Math.floor(forecast.list[4].main.temp_min)}<span>°C</span> / ${Math.ceil(forecast.list[4].main.temp_max)}<span>°C</span></h1>
    //     </div>          
    //     </div>`                 
    // }
    // )
    .then(()=>{
        for(i=1; i<5 ; i++){             
            forecast.innerHTML = ""
              forecastSection.innerHTML += `<div class="day-section day${i}">
        <div class="one-day">
            <h2>${weekdays[date.getDay() +i]>7 ? 0 : weekdays[date.getDay() +i]}, ${month} ${day +i}</h2>
        </div>          
        </div>`
        
        }

    })
    .then(()=>{
        

        for(i=0 ; i<forecast.list.length; i++){
            if(forecast.list[i].dt_txt.includes("00:00:00")){
                newDaysArr = forecast.list.slice(i,forecast.list.length)
                break
            }
        }
            console.log(newDaysArr)    
        function getDay1(){
            const date = newDaysArr[i].dt_txt.split(" ")[0].split("-")
            dayForecast.innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i>
            <h1 class="day">${dayOnDate(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]))} Forecast<h1>
            <h1>${newDaysArr[i].dt_txt.split(" ")[0]}</h1>`
           for(let i=0; i<9; i++){
            dayForecast.style.display="flex"
           dayForecast.innerHTML += `<h1><span>${newDaysArr[i].dt_txt.split(" ")[1]}</span>${newDaysArr[i].main.temp_min}°C ${pickIcon(newDaysArr[i].weather[0].icon)}     <span class="humidityy">${forecast.list[i].main.humidity}%</span> <i class="fa-solid fa-droplet"></i></h1>`                
        }
        document.querySelector(".fa-circle-arrow-left").addEventListener('click',()=>{
            dayForecast.style.display = "none"
        })
    }
    function getDay2(){
            const date = newDaysArr[i].dt_txt.split(" ")[0].split("-")
            dayForecast.innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i>
            <h1 class="day">${dayOnDate(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]))} Forecast<h1>
            <h1>${newDaysArr[i].dt_txt.split(" ")[0]}</h1>`
           for(let i=8; i<17; i++){
            dayForecast.style.display="flex"
           dayForecast.innerHTML += `<h1><span>${newDaysArr[i].dt_txt.split(" ")[1]}</span>${newDaysArr[i].main.temp_min}°C ${pickIcon(newDaysArr[i].weather[0].icon)}     <span class="humidityy">${forecast.list[i].main.humidity}%</span> <i class="fa-solid fa-droplet"></i></h1>`                
        }
        document.querySelector(".fa-circle-arrow-left").addEventListener('click',()=>{
            dayForecast.style.display = "none"
        })
    }
    function getDay3(){
            const date = newDaysArr[i].dt_txt.split(" ")[0].split("-")
            dayForecast.innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i>
            <h1 class="day">${dayOnDate(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]))} Forecast<h1>
            <h1>${newDaysArr[i].dt_txt.split(" ")[0]}</h1>`
           for(let i=16; i<25; i++){
            dayForecast.style.display="flex"
           dayForecast.innerHTML += `<h1><span>${newDaysArr[i].dt_txt.split(" ")[1]}</span>${newDaysArr[i].main.temp_min}°C ${pickIcon(newDaysArr[i].weather[0].icon)}     <span class="humidityy">${forecast.list[i].main.humidity}%</span> <i class="fa-solid fa-droplet"></i></h1>`                
        }
        document.querySelector(".fa-circle-arrow-left").addEventListener('click',()=>{
            dayForecast.style.display = "none"
        })
    }
    function getDay4(){
            const date = newDaysArr[i].dt_txt.split(" ")[0].split("-")
            dayForecast.innerHTML = `<i class="fa-solid fa-circle-arrow-left"></i>
            <h1 class="day">${dayOnDate(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]))} Forecast<h1>
            <h1>${newDaysArr[i].dt_txt.split(" ")[0]}</h1>`
           for(let i=24; i<32; i++){
            dayForecast.style.display="flex"
           dayForecast.innerHTML += `<h1><span>${newDaysArr[i].dt_txt.split(" ")[1]}</span>${newDaysArr[i].main.temp_min}°C ${pickIcon(newDaysArr[i].weather[0].icon)}     <span class="humidityy">${forecast.list[i].main.humidity}%</span> <i class="fa-solid fa-droplet"></i></h1>`                
        }
        document.querySelector(".fa-circle-arrow-left").addEventListener('click',()=>{
            dayForecast.style.display = "none"
        })
    }
    
        const firstDayMax = []
        document.querySelector(".day1").addEventListener('click',()=>{getDay1()})
        document.querySelector(".day2").addEventListener('click',()=>{getDay2()})
        document.querySelector(".day3").addEventListener('click',()=>{getDay3()})
        document.querySelector(".day4").addEventListener('click',()=>{getDay4()})
        
        
    })
})



function pickIcon(weather){
    switch(weather){
        case '01d':
            return `<i class="fa-solid fa-sun"></i>`;
        case '01n':
            return `<i class="fa-solid fa-moon"></i>`;
        case '02d':
            return `<i class="fa-solid fa-cloud-sun"></i>`;
        case '02n':
            return `<i class="fa-solid fa-cloud-moon"></i>`;
        case '03d':
            return `<i class="fa-solid fa-cloud"></i>`;
        case '03n':
            return `<i class="fa-solid fa-cloud"></i>`;
        case '04d':
            return `<i class="fa-solid fa-cloud"></i>`;
        case '04n':
            return `<i class="fa-solid fa-cloud"></i>`;
        case '09n':
            return `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
        case '09d':
            return `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
        case '10d':
            return `<i class="fa-solid fa-cloud-sun-rain"></i>`
        case '10n':
            return `<i class="fa-solid fa-cloud-moon-rain"></i>`
        case '11d':
            return `<i class="fa-solid fa-cloud-bolt"></i>`;
        case '11n':
            return `<i class="fa-solid fa-cloud-bolt"></i>`;
        case '13d':
            return `<i class="fa-solid fa-snowflake"></i>`;
        case '13n':
            return `<i class="fa-solid fa-snowflake"></i>`;
        case '50d':
            return `<i class="fa-solid fa-smog"></i>`;
        case '50n':
            return `<i class="fa-solid fa-smog"></i>`;            
    }
}
const arr = ["one","two","three","four","five","six"]
let newarr = []
for(i=0 ; i<arr.length; i++){
                    if(arr[i].includes("four")){
                        newarr = arr.splice(i,arr.length)
                    }
                }
                console.log(newarr)

function dayOnDate(day, month, year) {
	const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	monthDay = [ 1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
	years = year-1900;
	day = ( monthDay[month-1] + years + Math.floor(years/4) + day )%7;
	return weekdays[day];
}
console.log(dayOnDate(21,09,2022))