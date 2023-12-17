import API_KEY from "./apikey.js";
let cardsEl = document.querySelector(".cards");
let all = document.querySelector(".all");
let popular = document.querySelector(".popular");
async function getData() {
  let resp = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );
  let respdata = await resp.json();
  showData(respdata);
}

all.addEventListener("click", async () => {
  let resp = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );
  let respdata = await resp.json();
  showData(respdata);
});

popular.addEventListener("click", async () => {
  let resp = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );
  let respdata = await resp.json();
  showData(respdata);
});

getData();
function showData(data) {
  cardsEl.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `
    <a href=${data[i].game_url}>
      <img src="${data[i].thumbnail}" alt="" />
      <div class="card-info">
        <p>Platform: ${data[i].title}</p>
        <p>Platform: ${data[i].platform}</p>
        <small>${data[i].genre}</small>
      </div>
      <div class="card-more-info">
      <p>${data[i].short_description}</p>
      </div>
      </a>
      `;
    cardsEl.appendChild(cardEl);
  }
}
