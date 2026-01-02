"use strict";

// Elements

const emailInp = document.getElementById("email");
const emailError = document.querySelector(".email");

const passInp = document.getElementById("password");
const passError = document.querySelector(".password");

const submitBtn = document.getElementById("submit-btn");
const signInForm = document.getElementById("sign-in-form");

// Regex
const emailReg =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|edu|gov|io|co)$/;
const passReg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

//////////////////////////////////////////////////

let users;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

function validateInput(input, errorEl, regex, emptyMsg, invalidMsg) {
  const value = input.value.trim();
  errorEl.textContent = "";

  if (!value) {
    errorEl.textContent = emptyMsg;
    errorEl.classList.remove("hidden");
    return false;
  }

  if (regex && !regex.test(value)) {
    errorEl.textContent = invalidMsg;
    errorEl.classList.remove("hidden");
    return false;
  }

  errorEl.classList.add("hidden");
  return true;
}

emailInp.addEventListener("blur", () =>
  validateInput(
    emailInp,
    emailError,
    emailReg,
    "This field is required.",
    "Please enter a valid email."
  )
);

passInp.addEventListener("blur", () => {
  validateInput(
    passInp,
    passError,
    passReg,
    "This field is required.",
    "Password must be at least 8 characters include an uppercase letter, a lowercase letter, a number, and a special character."
  );
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isEmailValid = validateInput(
    emailInp,
    emailError,
    emailReg,
    "This field is required.",
    "Please enter a valid email."
  );

  const isPassValid = validateInput(
    passInp,
    passError,
    passReg,
    "This field is required.",
    "Password must be at least 8 characters include an uppercase letter, a lowercase letter, a number, and a special character."
  );

  if (isEmailValid && isPassValid) {
    let isVerified = false;
    // if account regestered
    users.forEach((el) => {
      if (el.email == emailInp.value && el.password == passInp.value) {
        isVerified = true;

        setTimeout(() => {
          location.href = "../pages/home.html";
        }, 500);

        localStorage.setItem("exam-status", "not-started");
        localStorage.setItem("currUser", JSON.stringify(el));
      }
    });

    if (!isVerified) {
      swal({
        title: "Failed",
        text: "Invalid email or password!",
        icon: "warning",
        dangerMode: true,
      });
      signInForm.reset();
    }
  }
});
