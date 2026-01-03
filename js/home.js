const welcomeUserFirstName = document.getElementById("welcome-user-first-name");
const mainContainerEle = document.getElementById("main-container");
const startExamNowBtnEle = document.getElementById("start-exam-now-btn");
const scoreEle = document.getElementById("score");

/* -------------------- Render firstName, lastName, email -------------------- */
const { firstName } = JSON.parse(localStorage.getItem("curr-user"));

welcomeUserFirstName.textContent = "Welcome " + firstName;
/* -------------------- Conditional Rendering according to exam-status in home page -------------------- */

const examStatus = localStorage.getItem("exam-status");
const studentScore = localStorage.getItem("student-score");

if (examStatus === "finished") {
  mainContainerEle.dataset["examStatus"] = "finished";
  scoreEle.textContent = `Your score: ${studentScore}%`;
} else if (examStatus === "in-progress") {
  mainContainerEle.dataset["examStatus"] = "in-progress";
} else {
  mainContainerEle.dataset["examStatus"] = "not-started";
}

/* -------------------- Start Exam Now Btn -------------------- */
startExamNowBtnEle.addEventListener("click", () => {
  localStorage.setItem("exam-status", "in-progress");
  location.href = "/pages/exam.html";
});
