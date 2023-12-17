import uniqueRandom from "https://cdn.jsdelivr.net/npm/unique-random@3.0.0/+esm";
let searchForm = document.querySelector(".sf");
let search = document.querySelector(".search");
let profileContainer = document.querySelector(".profile-container");
let randomFollowerEl = document.querySelector(".random-f");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getUser(search.value);
});

async function getUser(user) {
  let resp = await fetch(`https://api.github.com/users/${user}`);
  let respdata = await resp.json();
  createUserCart(respdata);
}

function createUserCart(respdata) {
  profileContainer.innerHTML = "";
  let profileEl = document.createElement("div");
  profileEl.classList.add("profile");
  if (respdata.message && respdata.message == "Not Found") {
    profileEl.innerHTML = `<h1>There isn't a user with this username</h1>`;
  } else {
    profileEl.innerHTML = `<div class="img-container">
    <img
      src="${respdata.avatar_url}"
      alt=""
    />
  </div>
  <h2>${(() => {
    if (respdata.name == null) {
      console.log("Hello");
      return "No Name";
    } else {
      return respdata.name;
    }
  })()}</h2>
  <a href=${respdata.html_url}><h3>@${respdata.login}</h3></a>
  <h2>${(() => {
    if (respdata.bio == null) {
      return "This User Has No Bio";
    } else {
      return respdata.bio;
    }
  })()}</h2>
  <div class="info">
    <small>Followers</small>
    <small>Following</small>
    <small>PRepos</small>
    <small>${respdata.followers}</small>
    <small>${respdata.following}</small>
    <small>${respdata.public_repos}</small>
  </div>
  <div class="more-info">
    <i class="fa-regular fa-building"></i>
    <i class="fa-solid fa-globe"></i>
    <i class="fa-brands fa-x-twitter"></i>
    <i class="fa-solid fa-link"></i>
    <small>${(() => {
      if (respdata.company == null) {
        return "No Company";
      } else {
        return respdata.company;
      }
    })()}</small>
    <small>${(() => {
      if (respdata.location == null) {
        return "No Location";
      } else {
        return respdata.location;
      }
    })()}</small>
    <small>${(() => {
      if (respdata.twitter_username == null) {
        return "No Twitter";
      } else {
        return respdata.twitter_username;
      }
    })()}</small>
    <small>${(() => {
      if (respdata.blog == "") {
        return "No Blog";
      } else {
        return respdata.blog;
      }
    })()}</small>
  </div>`;
  }
  profileContainer.appendChild(profileEl);
  createUserFollower(respdata.login);
}

async function createUserFollower(name) {
  randomFollowerEl.innerHTML = "";
  let resp = await fetch(`https://api.github.com/users/${name}/followers`);
  let respdata = await resp.json();

  if (respdata.length >= 1 && respdata.length <= 3) {
    respdata.forEach(async (follower) => {
      let respfriend = await fetch(
        `https://api.github.com/users/${follower.login}`
      );
      let respfrienddata = await respfriend.json();
      let friendEl = document.createElement("div");
      friendEl.classList.add("friend");
      friendEl.innerHTML = `
      <div class="img-container">
            <img
              src="${follower.avatar_url}"
              alt=""
            />
            </div>
            <h2>${respfrienddata.name}</h2>
            <a href = "${respfrienddata.html_url}"><h3>@${follower.login}</h3></a>
      `;

      randomFollowerEl.appendChild(friendEl);
    });
  } else if (respdata.length > 3) {
    let random = uniqueRandom(0, respdata.length - 1);
    for (let i = 0; i < 3; i++) {
      let follower = respdata[random()];
      let respfriend = await fetch(
        `https://api.github.com/users/${follower.login}`
      );
      let respfrienddata = await respfriend.json();
      let friendEl = document.createElement("div");
      friendEl.classList.add("friend");
      friendEl.innerHTML = `
      <div class="img-container">
            <img
              src="${follower.avatar_url}"
              alt=""
            />
            </div>
            <h2>${respfrienddata.name}</h2>
            <a href = "${respfrienddata.html_url}"><h3>@${follower.login}</h3></a>
      `;

      randomFollowerEl.appendChild(friendEl);
    }
  } else if (respdata.length == 0) {
    let friendEl = document.createElement("div");
    friendEl.classList.add("friend");
    friendEl.innerHTML = `
      <h1>This User Has No Followers</h1>
      `;
    randomFollowerEl.appendChild(friendEl);
  }
}
