const htmlElement = document.documentElement;

if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}

window.toggleTheme = () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }
};
