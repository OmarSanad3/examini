export const Header = (fullName, email, imageUrl) => {
  return `
    <header>
      <div
        class="flex md:flex-row flex-col flex-wrap justify-center md:justify-between items-center gap-5 bg-white dark:bg-gray-800 shadow-md md:mx-4 p-4 transition-colors duration-300">
        <div class="flex gap-4">
          <div class="flex rounded-full w-10 h-10 overflow-hidden">
            <img class="w-full h-full object-cover" src="${imageUrl}" alt="user-image">
          </div>
          <div class="flex flex-col">
            <p class="text-[#1E2939] dark:text-white">${fullName}</p>
            <p class="text-[#6A7282] dark:text-[#99A1AF]">${email}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button id="toggle-theme-btn"
            class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-800 dark:text-white text-base hover:scale-110 transition-all duration-300 cursor-pointer">
            <span class="hidden">
              <i class="fa-solid fa-moon"></i>
            </span>
            <span class="hidden">
              <i class="hidden fa-regular fa-sun"></i>
            </span>
          </button>
          <button
            class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-800 dark:text-white text-base hover:scale-110 transition-all duration-300 cursor-pointer">
            <i class="fa-solid fa-globe"></i> AR
          </button>
          <button
            class="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 p-2 rounded-lg text-red-600 dark:text-red-300 text-base hover:scale-110 transition-all duration-300 cursor-pointer">
            <i class="fa-arrow-right-from-bracket fa-solid"></i>
          </button>
        </div>
      </div>
    </header>
  `;
};
