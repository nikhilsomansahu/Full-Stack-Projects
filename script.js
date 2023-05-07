const inputbox = document.querySelector(".input-box");
const searchbtn = document.getElementById("searchbtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity-value");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

function checkWeather(city) {
  const api_Key = "7518df9c44520818bb6c44e9c4bb8ba0";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}`;

  fetch(`${url}`)
    .then((response) => {
      return response.json();
    })
    .then((value) => {
      if (Array.isArray(value?.weather) && value?.weather.length > 0) {
        const weather = value?.weather[0];
        temperature.innerHTML = `${Math.round(value?.main?.temp - 273.15)}°C`;
        description.innerHTML = `${weather.description}`;
        humidity.innerHTML = `${value.main.humidity}%`;
        wind_speed.innerHTML = `${value.wind.speed}Km/H`;
        switch (weather.main) {
          case "Clouds":
            weather_img.setAttribute("src", "/asset/cloud.png");
            break;
          case "Clear":
            weather_img.setAttribute("src", "/asset/clear.png");
            break;
          case "Rain":
            weather_img.setAttribute("src", "/asset/rain.png");
            break;
          case "Mist":
            weather_img.setAttribute("src", "/asset/mist.png");
            break;
          case "Snow":
            weather_img.setAttribute("src", "/asset/snow.png");
            break;
        }
      }
    })
    .catch((error) => {
      console.log("location not found");
    });
}

searchbtn.addEventListener("click", (e) => {
  checkWeather(inputbox.value);
});

inputbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(inputbox.value);
  }
});
