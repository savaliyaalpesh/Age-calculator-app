// Inputs
const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

// Outputs
const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

// Form element
const form = document.getElementById("age-form");

// Adding the submit event listener to the form
form.addEventListener("submit", handleSubmit);

// Function to check if the date is valid
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Validate inputs and check if the date is valid
function validate() {
  const inputs = document.querySelectorAll("input");
  let isValid = true;

  // Clear previous error messages
  inputs.forEach(input => {
    const parent = input.parentElement;
    input.style.borderColor = "black";
    parent.querySelector("small").innerText = "";
  });

  // Get input values
  const day = parseInt(dayInp.value);
  const month = parseInt(monthInp.value);
  const year = parseInt(yearInp.value);

  // Check if any input is empty
  if (!day || !month || !year) {
    isValid = false;
    inputs.forEach(input => {
      if (!input.value) {
        const parent = input.parentElement;
        input.style.borderColor = "red";
        parent.querySelector("small").innerText = "This field is required.";
      }
    });
  } else if (!isValidDate(day, month, year)) {
    // Check if the date is valid
    isValid = false;
    dayInp.style.borderColor = "red";
    monthInp.style.borderColor = "red";
    yearInp.style.borderColor = "red";

    // Show error message for invalid day
    const parent = dayInp.parentElement;
    parent.querySelector("small").innerText = "Must be a valid date.";
  } else {
    // Additional validation for month and year ranges
    if (month < 1 || month > 12) {
      isValid = false;
      monthInp.style.borderColor = "red";
      monthInp.parentElement.querySelector("small").innerText = "Must be a valid month.";
    }
    if (year > new Date().getFullYear()) {
      isValid = false;
      yearInp.style.borderColor = "red";
      yearInp.parentElement.querySelector("small").innerText = "Must be in the past.";
    }
  }

  return isValid;
}

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    const today = new Date();
    const inputDay = parseInt(dayInp.value);
    const inputMonth = parseInt(monthInp.value);
    const inputYear = parseInt(yearInp.value);

    let ageInDays = today.getDate() - inputDay;
    let ageInMonths = today.getMonth() + 1 - inputMonth;
    let ageInYears = today.getFullYear() - inputYear;

    // Adjust for negative values
    if (ageInDays < 0) {
      ageInMonths--;
      ageInDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Days in previous month
    }

    if (ageInMonths < 0) {
      ageInYears--;
      ageInMonths += 12;
    }

    // Set outputs
    dayOtp.innerHTML = ageInDays;
    monthOtp.innerHTML = ageInMonths;
    yearOtp.innerHTML = ageInYears;
  }
}
