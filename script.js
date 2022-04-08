// BUTTONS
const btnPrcntAll = document.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn-reset");

// INPUT FIELDS
const inputBill = document.getElementById("bill-input");
const inputPeople = document.getElementById("people-number");

const inputCustomPrcnt = document.getElementById("custom-input");

// CONTAINERS
const containerPrcnt = document.querySelector(".percentage-buttons");

// Elements
const tipPersonEl = document.querySelector(".tip-amount--per-person");
const tipTotalEl = document.querySelector(".tip-amount--total");

// TOUCH DEVICE HOVER FIX
function is_touch_enabled() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

if (!is_touch_enabled()) {
  btnPrcntAll.forEach((btn) => btn.classList.add("btn2"));
}

// GLOBAL VARIABLES
let percent;
let totalTip;

//////////////////////////HELPER FUNCTIONS/////////////////////////
const calculateTip = function (bill, percentage = 0) {
  if (bill === 0) return 0;
  return (bill * percentage) / 100;
};

const removeActiveClass = function () {
  btnPrcntAll.forEach((btn) => btn.classList.remove("active"));
};

// rendering data funvtion
const displayingTipData = function () {
  totalTip = calculateTip(Number(inputBill.value), percent);

  tipTotalEl.textContent = `$${totalTip.toFixed(2)}`;

  if (Number(inputPeople.value) > 0) {
    tipPersonEl.textContent = `$${(
      totalTip / Number(inputPeople.value)
    ).toFixed(2)}`;
  } else {
    tipPersonEl.textContent = `$${(0).toFixed(2)}`;
  }
};

////////////////////////////MAIN LOGIC//////////////////////////////
// getting predefined percentages from button
containerPrcnt.addEventListener("click", function (e) {
  if (e.target.matches(".btn")) {
    // removing and adding active class
    removeActiveClass();
    e.target.classList.add("active");

    percent = Number(e.target.textContent.slice(0, -1));

    displayingTipData();
  }
});

// getting custon percentage value from the input field
inputCustomPrcnt.addEventListener("input", function (e) {
  // removing and adding active class
  removeActiveClass();
  e.target.classList.add("active");

  percent = inputCustomPrcnt.value;

  displayingTipData();
});

// Handeling bill input field
inputBill.addEventListener("input", function () {
  if (inputBill.value === "0" || inputBill.value === "") {
    tipTotalEl.textContent = `$${(0).toFixed(2)}`;
    tipPersonEl.textContent = `$${(0).toFixed(2)}`;
  } else {
    displayingTipData();
  }
});

// handeling perople input field event
inputPeople.addEventListener("input", function (e) {
  // form validation
  if (inputPeople.value === "0" || inputPeople.value === "") {
    const error = inputPeople.parentNode.querySelector(".error-text");
    error.style.display = "inline-block";
    inputPeople.style.border = "2px solid #ff3333aa";
  } else {
    const error = inputPeople.parentNode.querySelector(".error-text");
    error.style.display = "none";
    inputPeople.style.border = "2px solid hsl(172, 67%, 45%)";
  }

  // displaying tips
  displayingTipData();
});

// implimenting Reset function
btnReset.addEventListener("click", function () {
  percent = 0;
  totalTip = 0;
  removeActiveClass();
  inputBill.value = "";
  inputPeople.value = "";
  inputCustomPrcnt.value = "";

  tipTotalEl.textContent = `$${(0).toFixed(2)}`;
  tipPersonEl.textContent = `$${(0).toFixed(2)}`;
});
