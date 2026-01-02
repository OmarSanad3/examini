const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById("toggle-theme-btn");
const [toDarkIcon, toLightIcon] = document.querySelectorAll(
  "#toggle-theme-btn span"
);

// 1. On page load, check localStorage or system settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  htmlElement.classList.add("dark");
  toLightIcon.classList.remove("hidden");
  toDarkIcon.classList.add("hidden");
} else {
  htmlElement.classList.remove("dark");
  toDarkIcon.classList.remove("hidden");
  toLightIcon.classList.add("hidden");
}

// 2. Add click event listener
themeToggleBtn.addEventListener("click", function () {
  // Toggle the 'dark' class on the <html> element
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
    toLightIcon.classList.add("hidden");
    toDarkIcon.classList.remove("hidden");
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
    toLightIcon.classList.remove("hidden");
    toDarkIcon.classList.add("hidden");
  }
});
