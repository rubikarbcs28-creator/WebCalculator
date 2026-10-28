let current = "";     // number being typed
let previous = "";    // first number / last result
let operator = "";    // + - * /

const resultEl  = document.getElementById("result");
const historyEl = document.getElementById("history");

// ---- Calculator operation functions ----
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

// ---- Show values on the display ----
function updateScreen() {
  resultEl.textContent = current || previous || "0";
  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  historyEl.textContent = (previous && operator) ? previous + " " + symbols[operator] : "";
}

// ---- Button actions ----
function appendNumber(num) {
  if (num === "." && current.includes(".")) return;
  if (operator === "" && current === "") previous = "";   // start fresh after a result
  current += num;
  updateScreen();
}

function chooseOperator(op) {
  if (current === "" && previous === "") return;
  if (current !== "" && previous !== "" && operator !== "") calculate();
  if (current !== "") {
    previous = current;
    current = "";
  }
  operator = op;
  updateScreen();
}

function calculate() {
  if (previous === "" || current === "" || operator === "") return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let answer;

  if (operator === "+") answer = add(a, b);
  if (operator === "-") answer = subtract(a, b);
  if (operator === "*") answer = multiply(a, b);
  if (operator === "/") answer = divide(a, b);

  if (answer === "Error") {
    clearAll();
    resultEl.textContent = "Cannot ÷ by 0";
    return;
  }

  previous = String(parseFloat(answer.toFixed(8)));
  current = "";
  operator = "";
  updateScreen();
}

function clearAll() {
  current = "";
  previous = "";
  operator = "";
  updateScreen();
}

function backspace() {
  current = current.slice(0, -1);
  updateScreen();
}

// ---- Keyboard support (extra credit) ----
document.addEventListener("keydown", function (e) {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") appendNumber(e.key);
  else if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); calculate(); }
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape" || e.key.toLowerCase() === "c") clearAll();
});
