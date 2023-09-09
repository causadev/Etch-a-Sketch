const container = document.querySelector(".container");
const color = document.querySelector("input");
const value = document.querySelector("#value");
const input = document.querySelector("#sizeSlider");
const clear = document.querySelector("#clearBtn");
const rainbow = document.querySelector("#rainbowBtn");
const erase = document.querySelector("#eraseBtn");
const colorModeBtn = document.querySelector("#colorBtn");
let defaultColor = "#000000";
let mouseDown = false;
let gridSize = 16;
let currentMode = "";
container.onmousedown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);
clear.addEventListener("click", clearGrid);
rainbow.addEventListener("click", rainbowMode);
erase.addEventListener("click", eraseGrid);
colorModeBtn.addEventListener("click", colorMode);

color.value = defaultColor;
input.value = gridSize;
value.textContent = `${gridSize} x ${gridSize}`;

input.addEventListener("mouseout", (event) => {
  gridSize = event.target.value;
  value.textContent = `${gridSize} x ${gridSize}`;
  clearGrid();
});

function clearGrid() {
  container.innerHTML = "";
  currentMode = "";
  createGrid(gridSize);
}

function colorMode() {
  currentMode = "color";
}

function eraseGrid() {
  currentMode = "erase";
}

function rainbowMode() {
  currentMode = "rainbow";
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("mouseover", changeColor);
    gridItem.addEventListener("mousedown", changeColor);
    container.appendChild(gridItem);
  }
}

function changeColor(event) {
  if (event.type === "mouseover" && !mouseDown) return;
  event.target.style.backgroundColor = color.value;
  if (currentMode === "rainbow") {
    event.target.style.backgroundColor = rainbowMode();
  } else if (currentMode === "erase") {
    event.target.style.backgroundColor = "#ffffff";
  } else if (currentMode === "color") {
    event.target.style.backgroundColor = color.value;
  }
}

createGrid(gridSize);
