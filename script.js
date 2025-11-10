// Get display input element
const display = document.getElementById('display');

/**
 * Appends a value (digit/operator) to the display
 */
function appendValue(value) {
  display.value += value;
}

/**
 * Clears the entire display content
 */
function clearDisplay() {
  display.value = '';
}

/**
 * Deletes the last entered character
 */
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/**
 * Evaluates the mathematical expression on the display
 * Handles both percentage (%) and modulo (mod)
 */
function calculate() {
  try {
    let expr = display.value;

    // --- Percentage Handling ---
    // Case 1: "a % b" → (a / 100 * b)
    expr = expr.replace(/(\d+(\.\d+)?)%(\d+(\.\d+)?)/g, (_, a, __, b) => {
      return `(${a} / 100 * ${b})`;
    });

    // Case 2: standalone "a%" → (a / 100)
    expr = expr.replace(/(\d+(\.\d+)?)%/g, (_, a) => {
      return `(${a} / 100)`;
    });

    // --- Modulo Handling ---
    // Replace the word 'mod' with '%' for standard JS modulo
    expr = expr.replace(/mod/g, '%');

    // Safely evaluate expression using Function constructor
    const result = Function('"use strict"; return (' + expr + ')')();

    // Display result
    display.value = result;
  } catch (err) {
    // Display error message if invalid expression
    display.value = "Error";
  }
}

/**
 * Optional: Keyboard input support
 * Allows using number keys, operators, Enter, Backspace, and Escape
 */
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
