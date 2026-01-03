"use strict";

// Elements
const firstNameInp = document.getElementById("first-name");
const firstNameError = document.querySelector(".first-name");

const lastNameInp = document.getElementById("last-name");
const lastNameError = document.querySelector(".last-name");

const emailInp = document.getElementById("email");
const emailError = document.querySelector(".email");

const passInp = document.getElementById("password");
const passError = document.querySelector(".password");

const rePassInp = document.getElementById("re-password");
const rePassError = document.querySelector(".re-password");

const profileInp = document.getElementById("profile");

const submitBtn = document.getElementById("submit-btn");
const signUpForm = document.getElementById("register-form");

// Regex
const nameReg = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const emailReg =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|edu|gov|io|co)$/;
const passReg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

//////////////////////////////////////////////////

let tmpImageBase64;

let registeredUsers;

if (localStorage.getItem("users")) {
  registeredUsers = JSON.parse(localStorage.getItem("users"));
} else {
  registeredUsers = [];
}
console.log(registeredUsers);

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

firstNameInp.addEventListener("blur", () =>
  validateInput(
    firstNameInp,
    firstNameError,
    nameReg,
    "This field is required.",
    "Please enter characters only."
  )
);

lastNameInp.addEventListener("blur", () =>
  validateInput(
    lastNameInp,
    lastNameError,
    nameReg,
    "This field is required.",
    "Please enter characters only."
  )
);

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

rePassInp.addEventListener("blur", () => {
  rePassError.textContent = "";

  if (!rePassInp.value) {
    rePassError.textContent = "This field is required";
  } else if (!passReg.test(rePassInp.value)) {
    rePassError.textContent =
      "Password must be at least 8 characters include an uppercase letter, a lowercase letter, a number, and a special character.";
  } else if (rePassInp.value !== passInp.value) {
    rePassError.textContent = "Passwords do not match";
  } else {
    rePassError.classList.add("hidden");
    return;
  }

  rePassError.classList.remove("hidden");
});

profileInp.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    // Preview the image
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("profile-img").classList.remove("hidden");
      document.getElementById("profile-img").src = e.target.result;
      tmpImageBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isFirstValid = validateInput(
    firstNameInp,
    firstNameError,
    nameReg,
    "This field is required.",
    "Please enter characters only."
  );

  const isLastValid = validateInput(
    lastNameInp,
    lastNameError,
    nameReg,
    "This field is required.",
    "Please enter characters only."
  );

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

  const isRePassValid =
    rePassInp.value &&
    rePassInp.value === passInp.value &&
    passReg.test(rePassInp.value);

  if (!isRePassValid) {
    rePassError.textContent = "Passwords do not match";
    rePassError.classList.remove("hidden");
  }

  if (
    isFirstValid &&
    isLastValid &&
    isEmailValid &&
    isPassValid &&
    isRePassValid
  ) {
    // user info
    const user = {
      firstName: firstNameInp.value,
      lastName: lastNameInp.value,
      email: emailInp.value,
      password: passInp.value,
      image: tmpImageBase64,
    };

    // flag
    let isExist = false;

    registeredUsers.forEach((el) => {
      // if regestered before
      if (el.email == user.email) {
        swal({
          title: "Failed",
          text: "Email already exists!",
          icon: "warning",
          dangerMode: true,
        });
        signUpForm.reset();
        isExist = true;
      }
    });

    if (!isExist) {
      // add to registeredUsers array
      registeredUsers.push(user);

      // set registeredUsers array to local storage
      localStorage.setItem("users", JSON.stringify(registeredUsers));

      swal({
        title: "Success!",
        text: "Your account has been created successfully.",
        icon: "success",
        dangerMode: false,
      }).then(() => {
        // redirect user to sign-in page
        setTimeout(() => {
          location.href = "/pages/sign-in.html";
        }, 500);
      });
    }
  }
});
