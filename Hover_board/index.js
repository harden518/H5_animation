const container = document.getElementById("container");
const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
const squareTotal = 500;

for (let i = 0; i < squareTotal; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  //mouseover
  square.addEventListener("mouseover", () => {
    setColorToEl(square);
  });
  //mouseout
  square.addEventListener("mouseout", () => {
    removeColorFromEl(square);
  });
  container.appendChild(square);
}

//setColorToEl
function setColorToEl(element) {
  const color = getRandomColor();
  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color},0 0 10px ${color}`;
}

//removeColorFromEl
function removeColorFromEl(element) {
  element.style.background = "#1d1d1d";
  element.style.boxShadow = `0 0 2px #000`;
}

//getRandomColor
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
