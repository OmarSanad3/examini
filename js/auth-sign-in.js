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

const appLang = localStorage.getItem("app-lang");

const langIndex = appLang === "ar" ? 1 : 0;

emailInp.addEventListener("blur", () =>
  validateInput(
    emailInp,
    emailError,
    emailReg,
    ["This field is required.", "هذا الحقل مطلوب"][langIndex],
    ["Please enter a valid email.", "الرجاء إدخال بريد إلكتروني صالح"][langIndex]
  )
);

passInp.addEventListener("blur", () => {
  validateInput(
    passInp,
    passError,
    passReg,
    ["This field is required.", "هذا الحقل مطلوب"][langIndex],
    ["Password must be at least 8 characters include an uppercase letter, a lowercase letter, a number, and a special character.", "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل تشمل حرفًا كبيرًا وحرفًا صغيرًا ورقمًا ورمزًا خاصًا."][langIndex]
  );
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isEmailValid = validateInput(
    emailInp,
    emailError,
    emailReg,
    ["This field is required.", "هذا الحقل مطلوب"][langIndex],
    ["Please enter a valid email.", "الرجاء إدخال بريد إلكتروني صالح"][langIndex]
  );

  const isPassValid = validateInput(
    passInp,
    passError,
    passReg,
    ["This field is required.", "هذا الحقل مطلوب"][langIndex],
    ["Password must be at least 8 characters include an uppercase letter, a lowercase letter, a number, and a special character.", "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل تشمل حرفًا كبيرًا وحرفًا صغيرًا ورقمًا ورمزًا خاصًا."][langIndex]
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

        localStorage.setItem("exam-info", null);
        localStorage.setItem("exam-status", "not-started");
        localStorage.setItem("curr-user", JSON.stringify(el));
      }
    });

    if (!isVerified) {
      swal({
        title: ["Failed", "فشل"][langIndex],
        text: ["Invalid email or password!", "البريد الإلكتروني أو كلمة المرور غير صحيحة!"][langIndex],
        icon: "warning",
        dangerMode: true,
        buttons: ["OK", "حسنًا"][langIndex],
      });
      signInForm.reset();
    }
  }
});

// //////////////////////////////
// toggle show/hide pass

const togglePassBtn = document.getElementById("toggle-password");

function togglePassword(input, button) {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  button.innerHTML = isPassword
    ? `<i class="fa-solid fa-eye"></i>`
    : `<i class="fa-solid fa-eye-slash"></i>`;
}

togglePassBtn.addEventListener("click", () =>
  togglePassword(passInp, togglePassBtn)
);
