let isZero = false;
let isDown = false;
function createScroll() {
  let div = document.createElement("div");
  div.classList.add("scroll");
  div.style.height = document.documentElement.clientHeight;
  document.body.appendChild(div);
}
createScroll();

let scroll = document.querySelector(".scroll");
function createThumb() {
  let div = document.createElement("div");
  div.classList.add("pos");
  div.style.height =
    window.innerHeight * (window.innerHeight / document.body.offsetHeight);
  scroll.appendChild(div);
}

createThumb();

let scrollval = 0;
window.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    scrollval += 2;
    if (scrollval >= document.documentElement.scrollHeight) {
      scrollval = document.documentElement.scrollHeight;
    }
    changePos(scrollval);
    window.scrollTo(0, scrollval * 28);
  } else if (e.deltaY > 0) {
    scrollval -= 1;
    if (scrollval <= 1) {
      scrollval = 2;
    }
    changePos(scrollval);
    window.scrollTo(0, scrollval * 28);
  }
});

function changePos(height = 0) {
  let pos = document.querySelector(".pos");
  let posTop = pos.getBoundingClientRect();
  if (posTop.y <= -1) {
    isZero = true;
    pos.style.top = 30;
    isZero = false;
  } else if (isZero == false) {
    pos.style.top = height;
  }
}

window.addEventListener("mousedown", (e) => {
  isDown = true;
});

window.addEventListener("mouseup", (e) => {
  isDown = false;
});
window.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (isDown && e.target.classList.contains("pos")) {
    let posX = event.clientY;
    window.scrollTo(0, posX * 6);
    changePos(posX);
  }
});
