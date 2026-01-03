const translations = {
  en: {
    // Auth
    register: "Register",
    login: "Login",
    logout: "Logout",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    password: "Password",
    reenterPassword: "Re-enter Password",
    profileImage: "Profile Image",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
    signIn: "Sign In",
    uploadImage: "Upload Image",

    // Home
    welcome: "Welcome",
    examInfo: "Exam Information",
    startExam: "Start Exam",
    continueExam: "Continue Exam",
    viewResults: "View Results",
    examCompleted: "Exam Completed!",
    getCertificate: "Get Certificate",
    examTitle: "General Knowledge Exam",
    examDescription: "Test your knowledge with 10 multiple choice questions",
    duration: "Duration: 20 minutes",
    minutes: "min",
    questions: "Questions: 10",
    passingScore: "Passing Score: 70%",
    status: "Status",
    notStarted: "Not Started",
    inProgress: "In Progress",
    completed: "Completed",


    // Exam
    question: "Question",
    of: "of",
    next: "Next",
    previous: "Previous",
    mark: "Mark",
    unmark: "Unmark",
    markedQuestions: "Marked Questions",
    submit: "Submit Exam",
    timeRemaining: "Time Remaining",
    submitConfirm: "Are you sure you want to submit the exam?",
    yes: "Yes",
    no: "No",

    // Results
    yourScore: "Your Score",
    passed: "Passed",
    failed: "Failed",
    correctAnswers: "Correct Answers",
    wrongAnswers: "Wrong Answers",
    reviewAnswers: "Review Answers",
    backToHome: "Back to Home",
    certificate: "Certificate of Completion",
    certificateText: "This certifies that",
    certificateCompleted: "has successfully completed the",
    certificateScore: "with a score of",
    close: "Close",

    // Validation
    requiredField: "This field is required",
    invalidEmail: "Invalid email address",
    passwordMismatch: "Passwords do not match",
    passwordLength: "Password must be at least 6 characters",
    invalidCredentials: "Invalid email or password",
    emailExists: "Email already exists",

    // UI
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
  },
  ar: {
    // Auth
    register: "تسجيل",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    reenterPassword: "أعد إدخال كلمة المرور",
    profileImage: "الصورة الشخصية",
    alreadyHaveAccount: "هل لديك حساب؟",
    dontHaveAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    uploadImage: "تحميل صورة",

    // Home
    welcome: "مرحباً",
    examInfo: "معلومات الامتحان",
    startExam: "ابدأ الامتحان",
    continueExam: "اكمل الامتحان",
    viewResults: "عرض النتائج",
    examCompleted: "تم إكمال الامتحان!",
    getCertificate: "احصل على الشهادة",
    examTitle: "امتحان المعرفة العامة",
    examDescription: "اختبر معرفتك مع 10 أسئلة متعددة الخيارات",
    duration: "المدة: 20 دقيقة",
    minutes: "دقيقة",
    questions: "الأسئلة: 10",
    passingScore: "درجة النجاح: 70%",
    status: "الحالة",
    notStarted: "لم يبدأ",
    inProgress: "قيد التنفيذ",
    completed: "مكتمل",

    // Exam
    question: "سؤال",
    of: "من",
    next: "التالي",
    previous: "السابق",
    mark: "وضع علامة",
    unmark: "إزالة العلامة",
    markedQuestions: "الأسئلة المحددة",
    submit: "إرسال الامتحان",
    timeRemaining: "الوقت المتبقي",
    submitConfirm: "هل أنت متأكد من إرسال الامتحان؟",
    yes: "نعم",
    no: "لا",

    // Results
    yourScore: "درجتك",
    passed: "ناجح",
    failed: "راسب",
    correctAnswers: "الإجابات الصحيحة",
    wrongAnswers: "الإجابات الخاطئة",
    reviewAnswers: "مراجعة الإجابات",
    backToHome: "العودة للرئيسية",
    certificate: "شهادة إتمام",
    certificateText: "هذا يشهد أن",
    certificateCompleted: "أكمل بنجاح",
    certificateScore: "بدرجة",
    close: "إغلاق",

    // Validation
    requiredField: "هذا الحقل مطلوب",
    invalidEmail: "بريد إلكتروني غير صالح",
    passwordMismatch: "كلمات المرور غير متطابقة",
    passwordLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
    invalidCredentials: "بريد إلكتروني أو كلمة مرور غير صالحة",
    emailExists: "البريد الإلكتروني موجود بالفعل",

    // UI
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    language: "اللغة",
  },
};

const lang = (word) => {
  return translations[currentLang][word];
};

// const htmlElement = document.documentElement;

const getInitialLanguage = () => {
  const savedLang = localStorage.getItem("app-lang");
  if (savedLang && translations[savedLang]) {
    return savedLang;
  }

  const browserLang = navigator.language.split("-")[0];
  return translations[browserLang] ? browserLang : "en";
};

const setLanguage = (lang) => {
  htmlElement.setAttribute("lang", lang);
  htmlElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

  localStorage.setItem("app-lang", lang);

  // document.querySelectorAll("[data-i18n]").forEach((el) => {
  //   const key = el.getAttribute("data-i18n");
  //   console.log(key, el);
  //   el.textContent = translations[lang][key] || "key";
  // });
};

const currentLang = getInitialLanguage();
currentLocale = currentLang;
setLanguage(currentLang);

window.changeLanguage = (newLang) => {
  if (translations[newLang]) {
    setLanguage(newLang);
    window.location.reload();
  }
};
