export const Answer = (answerText, isSelected, qIdx, ansIdx) => {
  return `
    <label
      class="flex items-center space-x-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md p-4 rounded-xl w-full text-gray-800 dark:text-white hover:scale-[101%] transition-all duration-300 cursor-pointer">
      <input
        onclick="onSelectAnswer(${qIdx}, ${ansIdx})"
        class="sr-only peer"
        type="radio"
        name="question-one"
        ${isSelected ? "checked" : ""}
      />
      <span
        class="relative flex justify-center items-center peer-checked:bg-white after:bg-linear-to-r after:from-blue-500 after:to-indigo-600 border-2 border-gray-300 dark:border-gray-500 peer-checked:border-indigo-600 rounded-full after:rounded-full w-6 after:w-3 h-6 after:h-3 after:content-[''] after:scale-0 peer-checked:after:scale-100 after:transition-transform after:duration-300">
      </span>
      <span class="flex-1">${answerText}</span>
    </label>
  `;
};
