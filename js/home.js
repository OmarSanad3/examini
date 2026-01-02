const welcomeUserFirstName = document.getElementById("welcome-user-first-name");
const mainContainerEle = document.getElementById("main-container");
const startExamNowBtnEle = document.getElementById("start-exam-now-btn");

/* -------------------- Render firstName, lastName, email -------------------- */
const { firstName } = JSON.parse(localStorage.getItem("currUser"));

welcomeUserFirstName.textContent = "Welcome " + firstName;
/* -------------------- Conditional Rendering according to exam-status in home page -------------------- */

const examStatus = localStorage.getItem("exam-status");

if (examStatus === "finished") {
  mainContainerEle.dataset["examStatus"] = "finished";
  // TODO: ui Status -> finished
} else if (examStatus === "in-progress") {
  // TODO: ui Status -> in-progress
} else {
  // [=== not-started]
  mainContainerEle.dataset["examStatus"] = "not-started";
  // TODO: ui Status -> not-started
}

/* -------------------- Start Exam Now Btn -------------------- */
startExamNowBtnEle.addEventListener("click", () => {
  localStorage.setItem("exam-status", "in-progress");
  location.href = "./exam.html";
});
