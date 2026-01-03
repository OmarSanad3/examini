import questions from "../data/questions.js";

const reviewAnswersContainer = document.getElementById("review-answers");
const studentStatusEle = document.getElementById("student-status");
const totalScoreEle = document.getElementById("total-score");
const numOfCorrectAnswersEle = document.getElementById(
  "num-of-correct-answers"
);
const numOfWrongAnswersEle = document.getElementById("num-of-wrong-answers");
const resultsContainerEle = document.getElementById("results-container");

const certificateSectionEle = document.getElementById("certificate");
const viewCertificateBtnEle = document.getElementById("view-certificate-btn");
const closeCertificateBtnEle = document.getElementById("close-certificate-btn");

const studentUserNameEle = document.getElementById("student-user-name");
const examScoreEle = document.getElementById("exam-score");

const issuedInEle = document.getElementById("issued-in");

const appLang = localStorage.getItem("app-lang");

const currentDate = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
issuedInEle.textContent = currentDate.toLocaleDateString(appLang, options);

const { firstName, lastName } = JSON.parse(localStorage.getItem("curr-user"));
studentUserNameEle.textContent = `${firstName} ${lastName}`;

closeCertificateBtnEle.addEventListener("click", () => {
  certificateSectionEle.dataset.certificate = "false";
});

viewCertificateBtnEle.addEventListener("click", () => {
  certificateSectionEle.dataset.certificate = "true";
});

certificateSectionEle.addEventListener("click", (e) => {
  if (e.target === certificateSectionEle) {
    certificateSectionEle.dataset.certificate = "false";
  }
});

const { userAnswers } = JSON.parse(localStorage.getItem("exam-info"));

function getSingleQuestionToRender(
  { id, question, questionAr, answers, answersAr, correctAnswer },
  userAns
) {
  const isCorrect = correctAnswer === userAns;

  return `
      <div data-question-status="${isCorrect ? "correct" : "wrong"}"
        class="group data-[question-status=correct]:bg-green-50 data-[question-status=correct]:dark:bg-green-900 data-[question-status=wrong]:bg-red-50 data-[question-status=wrong]:dark:bg-red-900 dark:bg-opacity-20 p-4 sm:p-6 border-2 data-[question-status=correct]:border-green-500 data-[question-status=wrong]:border-red-500 rounded-xl">
        <div class="flex gap-3">
          <div>
            <div
              class="hidden group-data-[question-status=correct]:flex justify-center items-center bg-green-500 rounded-full w-8 h-8">
              <i class="text-white text-xl fa-regular fa-circle-check"></i>
            </div>
            <div
              class="hidden group-data-[question-status=wrong]:flex justify-center items-center bg-red-500 rounded-full w-8 h-8">
              <i class="text-white fa-regular fa-circle-xmark"></i>
            </div>
          </div>
          <div class="grow">
            <h3 class="mb-3 text-gray-800 dark:text-white">${id}. ${
    appLang === "en" ? question : questionAr
  }</h3>
            <div class="flex flex-col gap-2">
              <!-- in js if user-selected && not correct bg-red-500 text-white, remove bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white -->
              <p 
                ${correctAnswer === 0 ? "data-corr-ans" : ""}
                ${!isCorrect && userAns === 0 ? "data-wrong-ans" : ""}
                class="
                  flex items-center gap-2 bg-gray-100 data-corr-ans:bg-green-500 data-wrong-ans:bg-red-500 dark:bg-gray-700 p-3 rounded-lg text-gray-800 data-corr-ans:text-white data-wrong-ans:text-white dark:text-white
                ">
                ${
                  !isCorrect && userAns === 0
                    ? '<i class="text-white text-xl fa-regular fa-circle-xmark"></i>'
                    : ""
                } 
                ${
                  correctAnswer === 0
                    ? '<i class="text-white text-xl fa-regular fa-circle-check"></i>'
                    : ""
                }
                ${appLang === "en" ? answers[0] : answersAr[0]}
              </p>
              <p 
                ${correctAnswer === 1 ? "data-corr-ans" : ""}
                ${!isCorrect && userAns === 1 ? "data-wrong-ans" : ""}
                class="
                  flex items-center gap-2 bg-gray-100 data-corr-ans:bg-green-500 data-wrong-ans:bg-red-500 dark:bg-gray-700 p-3 rounded-lg text-gray-800 data-corr-ans:text-white data-wrong-ans:text-white dark:text-white
                ">
                ${
                  !isCorrect && userAns === 1
                    ? '<i class="text-white text-xl fa-regular fa-circle-xmark"></i>'
                    : ""
                } 
                ${
                  correctAnswer === 1
                    ? '<i class="text-white text-xl fa-regular fa-circle-check"></i>'
                    : ""
                }

                ${appLang === "en" ? answers[1] : answersAr[1]}
              </p>
              <p
                ${correctAnswer === 2 ? "data-corr-ans" : ""}
                ${!isCorrect && userAns === 2 ? "data-wrong-ans" : ""}
                class="
                  flex items-center gap-2 bg-gray-100 data-corr-ans:bg-green-500 data-wrong-ans:bg-red-500 dark:bg-gray-700 p-3 rounded-lg text-gray-800 data-corr-ans:text-white data-wrong-ans:text-white dark:text-white
                ">
                ${
                  !isCorrect && userAns === 2
                    ? '<i class="text-white text-xl fa-regular fa-circle-xmark"></i>'
                    : ""
                } 
                ${
                  correctAnswer === 2
                    ? '<i class="text-white text-xl fa-regular fa-circle-check"></i>'
                    : ""
                }
                ${appLang === "en" ? answers[2] : answersAr[2]}
              </p>
              <p 
                ${correctAnswer === 3 ? "data-corr-ans" : ""}
                ${!isCorrect && userAns === 3 ? "data-wrong-ans" : ""}
                class="
                  flex items-center gap-2 bg-gray-100 data-corr-ans:bg-green-500 data-wrong-ans:bg-red-500 dark:bg-gray-700 p-3 rounded-lg text-gray-800 data-corr-ans:text-white data-wrong-ans:text-white dark:text-white
                ">
                ${
                  !isCorrect && userAns === 3
                    ? '<i class="text-white text-xl fa-regular fa-circle-xmark"></i>'
                    : ""
                }
                ${
                  correctAnswer === 3
                    ? '<i class="text-white text-xl fa-regular fa-circle-check"></i>'
                    : ""
                }
                ${appLang === "en" ? answers[3] : answersAr[3]}
              </p>
            </div>
          </div>
        </div>
      </div>
  `;
}

function renderReviewAnswers() {
  const stats = { numOfCorrectAnswers: 0, numOfWrongAnswers: 0 };

  for (let i = 0; i < questions.length; i++) {
    reviewAnswersContainer.innerHTML += getSingleQuestionToRender(
      questions[i],
      userAnswers[i]
    );
    const isCorrect = questions[i].correctAnswer === userAnswers[i];

    if (isCorrect) stats.numOfCorrectAnswers++;
    else stats.numOfWrongAnswers++;
  }

  numOfCorrectAnswersEle.textContent = stats.numOfCorrectAnswers;
  numOfWrongAnswersEle.textContent = stats.numOfWrongAnswers;

  const studentScore =
    (stats.numOfCorrectAnswers /
      (stats.numOfCorrectAnswers + stats.numOfWrongAnswers)) *
    100;

  localStorage.setItem("student-score", studentScore);

  totalScoreEle.textContent = studentScore + "%";

  examScoreEle.textContent = studentScore;

  if (studentScore >= 70) {
    studentStatusEle.textContent = appLang === "en" ? "Passed" : "ناجح";
    resultsContainerEle.dataset.status = "success";
  } else {
    studentStatusEle.textContent = appLang === "en" ? "Failed" : "راسب";
    resultsContainerEle.dataset.status = "fail";
  }
}

renderReviewAnswers();
