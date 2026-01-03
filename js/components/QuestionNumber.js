export const QuestionNumber = (isMarked, status, questionNumber) => {
  return `
    <span
      onclick="onSelectQuestion(${questionNumber - 1})"
      data-status="${status}"
      class="group relative flex justify-center items-center bg-gray-100 data-[status=answered]:bg-green-500 dark:bg-gray-700 data-[status=current]:bg-linear-to-br data-[status=current]:from-blue-500 data-[status=current]:to-indigo-600 rounded-lg data-[status=current]:ring-2 data-[status=current]:ring-blue-300 w-10 h-10 text-gray-800 data-[status=answered]:text-white data-[status=current]:text-white dark:text-white hover:scale-105 transition-all duration-300 cursor-pointer">
      ${questionNumber}
      <span class="hidden
        ${isMarked ? "inline-flex" : ""}
        top-0 right-0 absolute text-yellow-500"
      >
        <i class="fa-solid fa-bookmark"></i>
      </span>
    </span>
  `;
};
