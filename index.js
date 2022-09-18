const cityInput = document.querySelector(".city-input")
const searchBtn = document.querySelector(".search-btn")
let cityOptions = document.querySelector(".city-options")
let cityInfo = document.querySelectorAll(".city-info")
let forecast = document.querySelector(".forecast")
let cityInformations 
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
                <h1 class="city">${cityInformations[i].name} </h1>                
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
    cityOptions.appendChild(selectedOption.parentNode)
    console.log(selectedOption.parentNode)
    console.log(currentCity)
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCity.lat}&lon=${currentCity.lon}&appid=${weather.key}`)
    // .then(response => response.json())
    // .then(data => console.log(data));
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCity.lat}&lon=${currentCity.lon}&appid=${weather.key}`)
    .then(response => response.json())
    .then(data => console.log(data));
    
})



