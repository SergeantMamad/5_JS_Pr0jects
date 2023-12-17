import API_KEY from './apikey.js';
const search = document.querySelector(".searchbar");
const container = document.querySelector(".main-container");
search.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    getWeather(search.value);
  }
});

async function getWeather(value) {
  let resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`
  );
  let respdata = await resp.json();
  putInfoInPage(respdata);
}

function putInfoInPage(respdata) {
  container.innerHTML = "";
  let mainEl = document.createElement("div");
  mainEl.classList.add("main-content");
  if (respdata.cod && respdata.cod == "404") {
    mainEl.innerHTML = `<h1>Location not found</h1>`;
    container.append(mainEl);
  } else {
    mainEl.innerHTML = `<div class="location">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="map"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
    <h4>${respdata.name}</h4>
  </div>
  <img
    class="img-weather"
    src=${(() => {
      if (respdata.weather[0].icon == "01d") {
        return "images/cleard.png";
      } else if (respdata.weather[0].icon == "01n") {
        return "images/clearn.png";
      } else if (respdata.weather[0].icon == "02d") {
        return "images/cloudyd.png";
      } else if (respdata.weather[0].icon == "02n") {
        return "images/clodyn.png";
      } else if (respdata.weather[0].icon == "03d") {
        return "images/scatterd.png";
      } else if (respdata.weather[0].icon == "03n") {
        return "images/scattern.png";
      } else if (
        respdata.weather[0].icon == "04d" ||
        respdata.weather[0].icon == "04n"
      ) {
        return "images/broken.png";
      } else if (
        respdata.weather[0].icon == "09d" ||
        respdata.weather[0].icon == "10d"
      ) {
        return "images/raind.png";
      } else if (
        respdata.weather[0].icon == "09n" ||
        respdata.weather[0].icon == "10n"
      ) {
        return "images/rainn.png";
      } else if (respdata.weather[0].icon == "11d") {
        return "images/thunderd.png";
      } else if (respdata.weather[0].icon == "11n") {
        return "images/thundern.png";
      } else if (respdata.weather[0].icon == "13d") {
        return "images/snowd.png";
      } else if (respdata.weather[0].icon == "13n") {
        return "images/snown.png";
      } else if (respdata.weather[0].icon == "50d") {
        return "images/mistd.png";
      } else if (respdata.weather[0].icon == "50n") {
        return "images/mistn.png";
      }
    })()}
    alt=""
  />
  <div class="info">
    <h1>${(respdata.main.temp.toFixed(2) - 273.15).toFixed(2)}°C</h1>
    <p class="weather">${respdata.weather[0].description}</p>
    </div>`;
    container.append(mainEl);
  }
}

//
