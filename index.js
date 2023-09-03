const container = document.querySelector(".container");
const gridSizeBtn = document.querySelector("#gridSizeBtn");
const clearBtn = document.querySelector("#clearBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const colorModeBtn = document.querySelector("#colorModeBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const text = document.querySelector("#text");
let colorPicker = document.querySelector("#colorPicker");
let DEFAULT_COLOR = "#000000";
let userInput = 16;
let isDrawing = false;
let isRainbow = false;
colorPicker.value = DEFAULT_COLOR;
let colorAnterior;

rainbowBtn.addEventListener("click", () => {
  isRainbow = true;
});

container.addEventListener("mousedown", () => {
  isDrawing = true;
});

container.addEventListener("mouseup", () => {
  isDrawing = false;
});

eraserBtn.addEventListener("click", () => {
  colorAnterior = colorPicker.value;
  // Cambia el color a blanco (#ffffff)
  colorPicker.value = "#ffffff";
});

colorModeBtn.addEventListener("click", () => {
  isRainbow = false;
  colorPicker.value = colorAnterior;
});

clearBtn.addEventListener("click", clearGrid);
gridSizeBtn.addEventListener("click", () => {
  while (true) {
    userInput = Number(prompt("Enter A Grid Size (max 64x64)"));

    if (userInput >= 1 && userInput <= 64) {
      clearGrid();
      break;
    } else if (userInput === "") {
      clearGrid();
      break;
    } else {
      alert("Enter a valid input between 1 and 64");
    }
  }
});

function rainbowMode() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function clearGrid() {
  container.innerHTML = "";
  createGrid();
  userInput = 16;
}

colorPicker.addEventListener("change", (e) => {
  DEFAULT_COLOR = e.target.value;
});

function createGrid() {
  for (let i = 0; i < userInput * userInput; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    container.style.gridTemplateColumns = `repeat(${userInput}, 1fr)`;
    container.appendChild(gridItem);
    gridItem.addEventListener("mousemove", (e) => {
      if (isDrawing && userInput >= 1 && userInput <= 64) {
        e.target.style.backgroundColor = colorPicker.value;
      }
      if (isDrawing && isRainbow) {
        e.target.style.backgroundColor = rainbowMode();
      }
    });
  }
}

createGrid();
