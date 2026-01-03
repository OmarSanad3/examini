import questionsData from "../data/questions.js";

import { Answer } from "./components/Answer.js";
import { QuestionNumber } from "./components/QuestionNumber.js";
import { EXAM_DURATION } from "./utils/constants.js";

/* -------------------- DOM Elements -------------------- */
const questionEle = document.getElementById("question-info");
const prevBtnEle = document.getElementById("prev-btn");
const nextBtnEle = document.getElementById("next-btn");
const questionNumberEle = document.getElementById("question-number");
const [markBtn1, markBtn2] = [
  document.getElementById("mark-btn-1"),
  document.getElementById("mark-btn-2"),
];
const examAsideEle = document.getElementById("exam-aside");
const questionChoicesContainerEle = document.getElementById("question-choices");
const questionsNumbersContainer = document.getElementById(
  "questions-numbers-container"
);
const [minutesEle1, secondsEle1, minutesEle2, secondsEle2] = [
  document.getElementById("minutes-1"),
  document.getElementById("seconds-1"),
  document.getElementById("minutes-2"),
  document.getElementById("seconds-2"),
];
const [timerEle1, timerEle2] = [
  document.getElementById("timer-1"),
  document.getElementById("timer-2"),
];
const progressBarEle = document.getElementById("progress-bar");
const [submitExamBtnEle1, submitExamBtnEle2] = [
  document.getElementById("submit-exam-1"),
  document.getElementById("submit-exam-2"),
];
/* -------------------- Declared Variables -------------------- */
let userAnswers = Array(questionsData.length).fill(null);
let isMarkedQuestion = Array(questionsData.length).fill(false);

let questionIndex = 0;

let examEndTime = null;

fetchExamInfoFromLocalStorage();

/* -------------------- Starting the timer -------------------- */

(function () {
  if (examEndTime === null) {
    examEndTime = Date.now() + EXAM_DURATION;
    updateExamInfoInLocalStorage();
  }

  const remainingTime = (examEndTime - Date.now()) / 1000;
  const minutes = Math.max(0, Math.floor(remainingTime / 60));
  const seconds = Math.max(0, Math.floor(remainingTime % 60));

  renderTimer(minutes, seconds);

  const handler = setInterval(() => {
    const remainingTime = (examEndTime - Date.now()) / 1000;
    const minutes = Math.max(0, Math.floor(remainingTime / 60));
    const seconds = Math.max(0, Math.floor(remainingTime % 60));
    renderTimer(minutes, seconds);

    const percentage = Math.max(
      0,
      (remainingTime / (EXAM_DURATION / 1000)) * 100
    );
    progressBarEle.style.width = `${percentage}%`;

    if (remainingTime <= 0) {
      clearInterval(handler);
      submitExam();
    } else {
      if (percentage <= 10) {
        timerEle1.dataset.timer = "warning";
        timerEle2.dataset.timer = "warning";
      }
    }
  }, 1000);
})();

/* -------------------- Base Render -------------------- */

function renderAndUpdateLocalStorage() {
  renderQuestionInfo();
  renderMarkButtons();
  renderNextPrevButtons();
  renderChoices();
  renderQuestionsNumbers();

  updateExamInfoInLocalStorage();
}
renderAndUpdateLocalStorage();

/* -------------------- Render Elements -------------------- */

function renderQuestionInfo() {
  questionNumberEle.textContent = questionIndex + 1;
  questionEle.textContent = questionsData[questionIndex].question;
}

function renderMarkButtons() {
  if (isMarkedQuestion[questionIndex]) {
    markBtn1.dataset["marked"] = "true";
    markBtn2.dataset["marked"] = "true";
  } else {
    markBtn1.dataset["marked"] = "false";
    markBtn2.dataset["marked"] = "false";
  }
}

function renderNextPrevButtons() {
  questionIndex === 0
    ? (prevBtnEle.disabled = true)
    : (prevBtnEle.disabled = false);

  questionIndex === questionsData.length - 1
    ? (nextBtnEle.disabled = true)
    : (nextBtnEle.disabled = false);
}

function renderChoices() {
  questionChoicesContainerEle.innerHTML = "";

  questionsData[questionIndex].answers.forEach((ans, ansIdx) => {
    const answerHTML = Answer(
      ans,
      userAnswers[questionIndex] === ansIdx,
      questionIndex,
      ansIdx
    );
    questionChoicesContainerEle.insertAdjacentHTML("beforeend", answerHTML);
  });
}

function renderQuestionsNumbers() {
  questionsNumbersContainer.innerHTML = "";

  isMarkedQuestion.forEach((q, qIdx) => {
    const questionNumberHTML = QuestionNumber(
      q,
      questionIndex === qIdx
        ? "current"
        : userAnswers[qIdx] === null
        ? ""
        : "answered",
      qIdx + 1
    );

    questionsNumbersContainer.insertAdjacentHTML(
      "beforeend",
      questionNumberHTML
    );
  });
}

function renderTimer(minutes, seconds) {
  function format(x) {
    return x >= 10 ? x : "0" + x;
  }

  minutesEle1.textContent = format(minutes);
  minutesEle2.textContent = format(minutes);

  secondsEle1.textContent = format(seconds);
  secondsEle2.textContent = format(seconds);
}

/* -------------------- exam info in localStorage -------------------- */

function updateExamInfoInLocalStorage() {
  const examInfo = {
    userAnswers,
    isMarkedQuestion,
    questionIndex,
    examEndTime,
  };

  localStorage.setItem("exam-info", JSON.stringify(examInfo));
}

function fetchExamInfoFromLocalStorage() {
  try {
    const {
      userAnswers: ua,
      isMarkedQuestion: imq,
      questionIndex: qi,
      examEndTime: eet,
    } = JSON.parse(localStorage.getItem("exam-info"));

    userAnswers = ua;
    isMarkedQuestion = imq;
    questionIndex = qi;
    examEndTime = eet;
  } catch (err) {
    console.error(err.message);
  }
}

/* -------------------- Buttons EventListeners -------------------- */

nextBtnEle.addEventListener("click", () => {
  questionIndex++;
  renderAndUpdateLocalStorage();
});

prevBtnEle.addEventListener("click", () => {
  questionIndex--;
  renderAndUpdateLocalStorage();
});

function onMarkedBtn() {
  isMarkedQuestion[questionIndex] = !isMarkedQuestion[questionIndex];
  renderAndUpdateLocalStorage();
}
markBtn1.addEventListener("click", onMarkedBtn);
markBtn2.addEventListener("click", onMarkedBtn);

function submitExam() {
  localStorage.setItem("exam-status", "finished");
  location.href = "/pages/results.html";
}
submitExamBtnEle1.addEventListener("click", submitExam);
submitExamBtnEle2.addEventListener("click", submitExam);

window.onSelectQuestion = (qIdx) => {
  questionIndex = qIdx;
  renderAndUpdateLocalStorage();
  window.onCloseMarkedQuestions();
};

window.onSelectAnswer = (qIdx, ansIdx) => {
  userAnswers[qIdx] = ansIdx;
  updateExamInfoInLocalStorage();
};

window.onOpenMarkedQuestions = () => {
  examAsideEle.classList.remove("hidden");
  examAsideEle.classList.add("flex");
};

window.onCloseMarkedQuestions = () => {
  examAsideEle.classList.add("hidden");
  examAsideEle.classList.remove("flex");
};

examAsideEle.addEventListener("click", (event) => {
  if (event.target.id === "exam-aside") {
    window.onCloseMarkedQuestions();
  }
});
