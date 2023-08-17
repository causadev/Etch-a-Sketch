const container = document.querySelector(".container");
const gridSizeBtn = document.querySelector("#gridSizeBtn");
const clearBtn = document.querySelector("#clearBtn");
let colorPicker = document.querySelector("#colorPicker");
let DEFAULT_COLOR = "#000000";
colorPicker.value = DEFAULT_COLOR;
let userInput = 16;

clearBtn.addEventListener("click", clearGrid);
gridSizeBtn.addEventListener("click", () => {
  userInput = Number(prompt("Enter A Grid Size (max 64x64)"));
  if (isNaN(userInput)) {
    alert("Enter a valid input");
  } else if (userInput == null) {
    alert("Enter a valid input");
  } else if (userInput >= 64 || userInput <= 0) {
    alert("Enter a valid value");
  }
  clearGrid();
});

function clearGrid() {
  container.innerHTML = "";
  createGrid();
}

colorPicker.addEventListener("change", () => {
  clearGrid();
});

function createGrid() {
  for (let i = 0; i < userInput * userInput; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    container.style.gridTemplateColumns = `repeat(${userInput}, 1fr)`;
    container.appendChild(gridItem);
    gridItem.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = colorPicker.value;
    });
  }
}

createGrid();
