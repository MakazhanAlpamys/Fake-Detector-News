import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Translation data for all languages
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    contact: 'Contact',
    checkNews: 'Check News',
    history: 'History',
    profile: 'Profile',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Check News Page
    detectFakeNews: 'Detect Fake News',
    submitNewsPrompt: 'Submit news content to analyze its credibility using our advanced AI technology',
    checkNewsTitle: 'Check News',
    newsTitle: 'News Title',
    newsDescription: 'News Description',
    enterNewsTitle: 'Enter the title of the news article',
    enterNewsDescription: 'Enter the content or description of the news article',
    analyzeNews: 'Analyze News',
    analyzing: 'Analyzing...',
    
    // Results
    analysisResult: 'Analysis Result',
    real: 'REAL',
    fake: 'FAKE',
    confidenceScore: 'Confidence Score',
    analyzedNews: 'Analyzed Article',
    detailedAnalysis: 'Analysis Details',
    
    // Info
    aiInfoText: 'Our AI uses advanced natural language processing to analyze news content. While highly accurate, we recommend using this tool as one of many resources for verifying information.',
    
    // Footer
    appDescription: 'Fighting misinformation with cutting-edge AI technology. Our mission is to help people identify fake news and promote media literacy.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // History Page
    historyTitle: 'Your News Check History',
    historyDescription: 'Review all your previous news verification results and their credibility scores',
    loadingHistory: 'Loading your history...',
    noHistoryTitle: 'You haven\'t checked any news yet',
    noHistoryDescription: 'Start by analyzing news on the Check News page',
    checkNewsNow: 'Check News Now',
    historyInfoText: 'Click on any row to expand the news content. Your history is private and only visible to you.',
    date: 'Date',
    result: 'Result',
    
    // Admin Panel
    adminPanel: 'Admin Panel',
    viewStatistics: 'View Statistics',
    searchUsers: 'Search users...',
    nickname: 'Nickname',
    email: 'Email',
    role: 'Role',
    created: 'Created',
    actions: 'Actions',
    deleteUser: 'Delete User',
    confirmDelete: 'Are you sure you want to delete this user? This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    makeAdmin: 'Make Admin',
    statistics: 'Statistics',
    totalUsers: 'Total Users',
    totalChecks: 'Total News Checks',
    avgFakePercent: 'Average Fake News %',
    topUsers: 'Top Active Users',
    
    // Home Page
    withAI: 'With AI',
    aiPowered: 'Harness the power of advanced AI to identify misinformation and protect yourself from fake news.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    howItWorks: 'How It Works',
    enterNewsDetails: 'Enter News Details',
    inputNewsDescription: 'Input the title and description of the news article you want to verify',
    aiAnalysis: 'AI Analysis',
    aiAnalysisDescription: 'Our advanced AI analyzes the content and checks for signs of misinformation',
    getResults: 'Get Results',
    getResultsDescription: 'Receive a detailed report on whether the news is real or fake, with confidence score',
    whyChooseUs: 'Why Choose Us',
    accuracy: 'Accuracy',
    accuracyDescription: 'Powered by advanced AI technology for reliable results',
    easyToUse: 'Easy to Use',
    easyToUseDescription: 'Simple interface that anyone can understand',
    historyTracking: 'History Tracking',
    historyTrackingDescription: 'Keep track of all your previous news checks',
    fightMisinformation: 'Fight Misinformation',
    fightMisinformationDescription: 'Help promote truth and accuracy in media',
    byTheNumbers: 'By The Numbers',
    accuracyRate: 'Accuracy Rate',
    articlesAnalyzed: 'Articles Analyzed',
    users: 'Users',
    support: 'Support',
    testimonials: 'Testimonials',
    readyToStart: 'Ready to start checking news?',
    createAccount: 'Create your free account today',
    
    // Login Page
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    loggingIn: 'Logging in...',
    noAccount: 'Don\'t have an account?',
    registerHere: 'Register here',
    
    // Tooltips & Hints
    tooltipTheme: 'Toggle theme',
    tooltipLang: 'Change language',
    tooltipSearch: 'Search',
    tooltipProfile: 'View profile',
    tooltipLogout: 'Log out',
    tooltipAdmin: 'Admin panel',
    tooltipBack: 'Go back',
    tooltipAnalyze: 'Start analysis',
    tooltipHistory: 'View history',
    tooltipCopy: 'Copy to clipboard',
    tooltipShare: 'Share result',
    tooltipDelete: 'Delete',
    tooltipEdit: 'Edit',
    tooltipSave: 'Save changes',
    tooltipCancel: 'Cancel',
    
    // Error messages
    errorInvalidCredentials: 'Invalid email or password',
    errorRequired: 'This field is required',
    errorWeakPassword: 'Password must include upper/lowercase letters, numbers and special characters',
    errorEmailExists: 'This email is already registered',
    errorServerError: 'Server error. Please try again later',
    errorConnectionError: 'Connection error. Please check your internet connection',
    errorInvalidEmail: 'Please enter a valid email address',
    errorPasswordMismatch: 'Passwords do not match',
    errorLoginRequired: 'Please login to continue',
    errorAccessDenied: 'Access denied. You don\'t have permission to view this page',
    
    // Admin login hint
    adminLoginHint: 'Use admin@example.com / Admin123! to login as administrator',
    
    // Добавляем отзывы
    whatOurUsersSay: "What Our Users Say",
    testimonial1: "This tool has dramatically improved how I verify news sources in my reporting. It's quick, accurate, and helps me maintain journalistic integrity.",
    testimonial2: "My students now use this platform for media literacy education. It's transformed how they analyze and interpret news content.",
    testimonial3: "Implementing this tool in our organization has significantly reduced the spread of misinformation in our communications.",
    journalist: "Journalist",
    universityProfessor: "University Professor",
    communicationsDirector: "Communications Director",
    whyUseFakeNewsDetector: "Why Use Fake News Detector?",
    platformDescription: "Our advanced AI-powered platform helps you make informed decisions about the content you consume and share.",
    
    // Добавляем профиль
    yourProfile: "Your Profile",
    updateProfile: "Update Profile",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    
    // Admin Statistics
    userStatistics: 'User Statistics',
    backToAdminPanel: 'Back to Admin Panel',
    loadingStatistics: 'Loading statistics...',
    generalStatistics: 'General Statistics',
    registeredAccounts: 'Registered accounts',
    newsChecksPerformed: 'News checks performed',
    fakeNewsPercentage: 'Fake News Percentage',
    realNewsPercentage: 'Real News Percentage',
    avgFakeNewsDetected: 'Average percentage of news detected as fake',
    avgRealNewsDetected: 'Average percentage of news detected as real',
    topActiveUsers: 'Top 5 Active Users',
    noDataAvailableYet: 'No data available yet',
    checksPerformed: 'checks performed',
    userContribution: 'Each user\'s contribution to the total news checks',
    userManagement: 'User Management',
    allRoles: 'All Roles',
    noUsersFound: 'No users found matching your criteria',
    filteredUsers: 'Filtered',
  },
  ru: {
    // Navigation
    home: 'Главная',
    contact: 'Контакт',
    checkNews: 'Проверить новость',
    history: 'История',
    profile: 'Профиль',
    admin: 'Администратор',
    login: 'Вход',
    register: 'Регистрация',
    logout: 'Выход',
    
    // Check News Page
    detectFakeNews: 'Определение фейковых новостей',
    submitNewsPrompt: 'Отправьте содержание новости для анализа её достоверности с помощью нашей продвинутой технологии ИИ',
    checkNewsTitle: 'Проверка новостей',
    newsTitle: 'Заголовок новости',
    newsDescription: 'Описание новости',
    enterNewsTitle: 'Введите заголовок новостной статьи',
    enterNewsDescription: 'Введите содержание или описание новостной статьи',
    analyzeNews: 'Проанализировать новость',
    analyzing: 'Анализ...',
    
    // Results
    analysisResult: 'Результат анализа',
    real: 'ПРАВДА',
    fake: 'ФЕЙК',
    confidenceScore: 'Степень уверенности',
    analyzedNews: 'Анализируемая статья',
    detailedAnalysis: 'Детали анализа',
    
    // Info
    aiInfoText: 'Наш ИИ использует продвинутую обработку естественного языка для анализа новостного контента. Несмотря на высокую точность, мы рекомендуем использовать этот инструмент как один из многих ресурсов для проверки информации.',
    
    // Footer
    appDescription: 'Борьба с дезинформацией с помощью передовой технологии ИИ. Наша миссия - помочь людям определять фейковые новости и способствовать медиаграмотности.',
    quickLinks: 'Быстрые ссылки',
    contactUs: 'Связаться с нами',
    allRightsReserved: 'Все права защищены.',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    
    // History Page
    historyTitle: 'История проверки новостей',
    historyDescription: 'Просмотрите все ваши предыдущие результаты проверки новостей и их степень достоверности',
    loadingHistory: 'Загрузка вашей истории...',
    noHistoryTitle: 'Вы еще не проверяли новости',
    noHistoryDescription: 'Начните с анализа новостей на странице проверки новостей',
    checkNewsNow: 'Проверить новость сейчас',
    historyInfoText: 'Нажмите на любую строку, чтобы развернуть содержание новости. Ваша история приватна и видна только вам.',
    date: 'Дата',
    result: 'Результат',
    
    // Admin Panel
    adminPanel: 'Панель администратора',
    viewStatistics: 'Просмотр статистики',
    searchUsers: 'Поиск пользователей...',
    nickname: 'Имя пользователя',
    email: 'Электронная почта',
    role: 'Роль',
    created: 'Создан',
    actions: 'Действия',
    deleteUser: 'Удалить пользователя',
    confirmDelete: 'Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.',
    cancel: 'Отмена',
    delete: 'Удалить',
    makeAdmin: 'Сделать администратором',
    statistics: 'Статистика',
    totalUsers: 'Всего пользователей',
    totalChecks: 'Всего проверок новостей',
    avgFakePercent: 'Средний % фейковых новостей',
    topUsers: 'Самые активные пользователи',
    
    // Home Page
    withAI: 'C ИИ',
    aiPowered: 'Используйте мощь продвинутого ИИ для выявления дезинформации и защиты от фейковых новостей.',
    getStarted: 'Начать',
    learnMore: 'Узнать больше',
    howItWorks: 'Как это работает',
    enterNewsDetails: 'Введите детали новости',
    inputNewsDescription: 'Введите заголовок и описание новостной статьи, которую хотите проверить',
    aiAnalysis: 'Анализ с помощью ИИ',
    aiAnalysisDescription: 'Наш продвинутый ИИ анализирует содержание и проверяет на признаки дезинформации',
    getResults: 'Получите результаты',
    getResultsDescription: 'Получите подробный отчет о том, является ли новость реальной или фейковой, с оценкой достоверности',
    whyChooseUs: 'Почему выбирают нас',
    accuracy: 'Точность',
    accuracyDescription: 'Работает на передовой технологии ИИ для надежных результатов',
    easyToUse: 'Простота использования',
    easyToUseDescription: 'Простой интерфейс, который понятен каждому',
    historyTracking: 'Отслеживание истории',
    historyTrackingDescription: 'Ведите учет всех ваших предыдущих проверок новостей',
    fightMisinformation: 'Борьба с дезинформацией',
    fightMisinformationDescription: 'Помогите продвигать правду и точность в СМИ',
    byTheNumbers: 'В цифрах',
    accuracyRate: 'Процент точности',
    articlesAnalyzed: 'Проанализировано статей',
    users: 'Пользователей',
    support: 'Поддержка',
    testimonials: 'Отзывы',
    readyToStart: 'Готовы начать проверять новости?',
    createAccount: 'Создайте свой бесплатный аккаунт сегодня',
    
    // Login Page
    enterEmail: 'Введите вашу почту',
    enterPassword: 'Введите ваш пароль',
    loggingIn: 'Выполняется вход...',
    noAccount: 'Нет аккаунта?',
    registerHere: 'Зарегистрируйтесь здесь',
    
    // Tooltips & Hints
    tooltipTheme: 'Переключить тему',
    tooltipLang: 'Изменить язык',
    tooltipSearch: 'Поиск',
    tooltipProfile: 'Просмотр профиля',
    tooltipLogout: 'Выйти',
    tooltipAdmin: 'Панель администратора',
    tooltipBack: 'Назад',
    tooltipAnalyze: 'Начать анализ',
    tooltipHistory: 'Просмотр истории',
    tooltipCopy: 'Копировать в буфер',
    tooltipShare: 'Поделиться результатом',
    tooltipDelete: 'Удалить',
    tooltipEdit: 'Редактировать',
    tooltipSave: 'Сохранить изменения',
    tooltipCancel: 'Отмена',
    
    // Error messages
    errorInvalidCredentials: 'Неверный адрес электронной почты или пароль',
    errorRequired: 'Это поле обязательно для заполнения',
    errorWeakPassword: 'Пароль должен содержать заглавные/строчные буквы, цифры и специальные символы',
    errorEmailExists: 'Этот адрес электронной почты уже зарегистрирован',
    errorServerError: 'Ошибка сервера. Пожалуйста, попробуйте позже',
    errorConnectionError: 'Ошибка соединения. Пожалуйста, проверьте подключение к интернету',
    errorInvalidEmail: 'Пожалуйста, введите действительный адрес электронной почты',
    errorPasswordMismatch: 'Пароли не совпадают',
    errorLoginRequired: 'Пожалуйста, войдите для продолжения',
    errorAccessDenied: 'Доступ запрещен. У вас нет прав для просмотра этой страницы',
    
    // Admin login hint
    adminLoginHint: 'Используйте admin@example.com / Admin123! для входа как администратор',
    
    // Contact Page
    name: 'Имя',
    message: 'Сообщение',
    yourName: 'Ваше имя',
    yourEmail: 'Ваша электронная почта',
    yourMessage: 'Ваше сообщение',
    sendMessage: 'Отправить сообщение',
    sending: 'Отправка...',
    helpQuestion: 'Есть вопросы? Мы здесь, чтобы помочь!',
    emailUs: 'Напишите нам по адресу:',
    messageSent: 'Ваше сообщение успешно отправлено!',
    failedToSend: 'Не удалось отправить сообщение',
    
    // Detailed Analysis
    analysisExplanation: 'Объяснение анализа:',
    classificationResults: 'Результаты классификации:',
    misleadingInformation: 'вводящая в заблуждение информация:',
    reliableNews: 'достоверные новости:',
    fakeNews: 'фейковые новости:',
    confidenceExplanation: 'Этот контент был определен как потенциально ненадежный с уверенностью в',
    misleadingContent: 'Текст содержит элементы, которые обычно ассоциируются с вводящей в заблуждение или сфабрикованной информацией.',
    algorithmicAssessment: 'Примечание: Это алгоритмическая оценка, и ее следует использовать вместе с другими методами проверки.',
    headline: 'Заголовок:',
    contentSummary: 'Краткое содержание:',
    
    // Добавляем отзывы
    whatOurUsersSay: "Что говорят наши пользователи",
    testimonial1: "Этот инструмент кардинально улучшил способ проверки новостных источников в моих репортажах. Он быстрый, точный и помогает мне поддерживать журналистскую честность.",
    testimonial2: "Мои студенты теперь используют эту платформу для обучения медиаграмотности. Это изменило то, как они анализируют и интерпретируют новостной контент.",
    testimonial3: "Внедрение этого инструмента в нашей организации значительно сократило распространение дезинформации в наших коммуникациях.",
    journalist: "Журналист",
    universityProfessor: "Профессор университета",
    communicationsDirector: "Директор по коммуникациям",
    whyUseFakeNewsDetector: "Почему стоит использовать Fake News Detector?",
    platformDescription: "Наша продвинутая платформа на базе ИИ помогает вам принимать обоснованные решения о контенте, который вы потребляете и которым делитесь.",
    
    // Добавляем профиль
    yourProfile: "Ваш профиль",
    updateProfile: "Обновить профиль",
    changePassword: "Изменить пароль",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmNewPassword: "Подтвердите новый пароль",
    
    // Admin Statistics
    userStatistics: 'Статистика пользователей',
    backToAdminPanel: 'Вернуться в панель администратора',
    loadingStatistics: 'Загрузка статистики...',
    generalStatistics: 'Общая статистика',
    registeredAccounts: 'Зарегистрированные аккаунты',
    newsChecksPerformed: 'Выполнено проверок новостей',
    fakeNewsPercentage: 'Процент фейковых новостей',
    realNewsPercentage: 'Процент достоверных новостей',
    avgFakeNewsDetected: 'Средний процент новостей, определенных как фейковые',
    avgRealNewsDetected: 'Средний процент новостей, определенных как достоверные',
    topActiveUsers: 'Топ-5 активных пользователей',
    noDataAvailableYet: 'Данные пока отсутствуют',
    checksPerformed: 'выполнено проверок',
    userContribution: 'Вклад каждого пользователя в общее количество проверок новостей',
    userManagement: 'Управление пользователями',
    allRoles: 'Все роли',
    noUsersFound: 'Не найдено пользователей, соответствующих критериям',
    filteredUsers: 'Отфильтровано',
    users: 'пользователей',
  },
  kz: {
    // Navigation
    home: 'Басты бет',
    contact: 'Байланыс',
    checkNews: 'Жаңалықты тексеру',
    history: 'Тарих',
    profile: 'Профиль',
    admin: 'Әкімші',
    login: 'Кіру',
    register: 'Тіркелу',
    logout: 'Шығу',
    
    // Check News Page
    detectFakeNews: 'Жалған жаңалықтарды анықтау',
    submitNewsPrompt: 'Біздің жетілдірілген ЖИ технологиясымен оның шынайылығын талдау үшін жаңалық мазмұнын жіберіңіз',
    checkNewsTitle: 'Жаңалықты тексеру',
    newsTitle: 'Жаңалық тақырыбы',
    newsDescription: 'Жаңалық сипаттамасы',
    enterNewsTitle: 'Жаңалық мақаласының тақырыбын енгізіңіз',
    enterNewsDescription: 'Жаңалық мақаласының мазмұнын немесе сипаттамасын енгізіңіз',
    analyzeNews: 'Жаңалықты талдау',
    analyzing: 'Талдау...',
    
    // Results
    analysisResult: 'Талдау нәтижесі',
    real: 'ШЫНАЙЫ',
    fake: 'ЖАЛҒАН',
    confidenceScore: 'Сенімділік деңгейі',
    analyzedNews: 'Талданған мақала',
    detailedAnalysis: 'Талдау нәтижелері',
    
    // Info
    aiInfoText: 'Біздің ЖИ жаңалық мазмұнын талдау үшін табиғи тілді өңдеудің жетілдірілген технологиясын қолданады. Жоғары дәлдігіне қарамастан, бұл құралды ақпаратты тексеру үшін көптеген ресурстардың бірі ретінде пайдалануды ұсынамыз.',
    
    // Footer
    appDescription: 'Жетілдірілген ЖИ технологиясы арқылы дезинформациямен күрес. Біздің миссиямыз - адамдарға жалған жаңалықтарды анықтауға және медиа сауаттылықты ілгерілетуге көмектесу.',
    quickLinks: 'Жылдам сілтемелер',
    contactUs: 'Бізбен байланыс',
    allRightsReserved: 'Барлық құқықтар қорғалған.',
    privacyPolicy: 'Құпиялылық саясаты',
    termsOfService: 'Қызмет көрсету шарттары',
    
    // History Page
    historyTitle: 'Жаңалықтарды тексеру тарихы',
    historyDescription: 'Бұрынғы жаңалықтарды тексеру нәтижелерін және олардың сенімділік деңгейлерін қарап шығыңыз',
    loadingHistory: 'Тарихыңыз жүктелуде...',
    noHistoryTitle: 'Сіз әлі жаңалықтарды тексермедіңіз',
    noHistoryDescription: 'Жаңалықтарды тексеру бетінде талдаудан бастаңыз',
    checkNewsNow: 'Қазір жаңалықты тексеру',
    historyInfoText: 'Жаңалық мазмұнын кеңейту үшін кез-келген жолды басыңыз. Сіздің тарихыңыз жеке және тек сізге көрінеді.',
    date: 'Күні',
    result: 'Нәтиже',
    
    // Admin Panel
    adminPanel: 'Әкімші панелі',
    viewStatistics: 'Статистиканы қарау',
    searchUsers: 'Пайдаланушыларды іздеу...',
    nickname: 'Пайдаланушы аты',
    email: 'Электрондық пошта',
    role: 'Рөлі',
    created: 'Құрылған',
    actions: 'Әрекеттер',
    deleteUser: 'Пайдаланушыны жою',
    confirmDelete: 'Бұл пайдаланушыны жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті кері қайтару мүмкін емес.',
    cancel: 'Болдырмау',
    delete: 'Жою',
    makeAdmin: 'Әкімші ету',
    statistics: 'Статистика',
    totalUsers: 'Барлық пайдаланушылар',
    totalChecks: 'Барлық тексерулер',
    avgFakePercent: 'Орташа жалған жаңалықтар %',
    topUsers: 'Ең белсенді пайдаланушылар',
    
    // Home Page
    withAI: 'ЖИ көмегімен',
    aiPowered: 'Жетілдірілген ЖИ қуатын пайдаланып, дезинформацияны анықтаңыз және жалған жаңалықтардан қорғаныңыз.',
    getStarted: 'Бастау',
    learnMore: 'Толығырақ білу',
    howItWorks: 'Бұл қалай жұмыс істейді',
    enterNewsDetails: 'Жаңалық мәліметтерін енгізіңіз',
    inputNewsDescription: 'Тексергіңіз келетін жаңалық мақаласының тақырыбы мен сипаттамасын енгізіңіз',
    aiAnalysis: 'ЖИ арқылы талдау',
    aiAnalysisDescription: 'Біздің жетілдірілген ЖИ мазмұнды талдайды және дезинформация белгілерін тексереді',
    getResults: 'Нәтижелерді алыңыз',
    getResultsDescription: 'Жаңалықтың шынайы немесе жалған екендігі туралы сенімділік деңгейімен егжей-тегжейлі есеп алыңыз',
    whyChooseUs: 'Бізді неге таңдайды',
    accuracy: 'Дәлдік',
    accuracyDescription: 'Сенімді нәтижелер үшін жетілдірілген ЖИ технологиясымен жұмыс істейді',
    easyToUse: 'Қолдану қарапайымдылығы',
    easyToUseDescription: 'Әркімге түсінікті қарапайым интерфейс',
    historyTracking: 'Тарихты бақылау',
    historyTrackingDescription: 'Барлық бұрынғы жаңалықтарды тексеру есебін сақтаңыз',
    fightMisinformation: 'Дезинформациямен күресу',
    fightMisinformationDescription: 'БАҚ-та шындық пен дәлдікті алға жылжытуға көмектесіңіз',
    byTheNumbers: 'Сандармен',
    accuracyRate: 'Дәлдік пайызы',
    articlesAnalyzed: 'Талданған мақалалар',
    users: 'Пайдаланушылар',
    support: 'Қолдау',
    testimonials: 'Пікірлер',
    readyToStart: 'Жаңалықтарды тексеруге дайынсыз ба?',
    createAccount: 'Бүгін тегін тіркелгі жасаңыз',
    
    // Login Page
    enterEmail: 'Электрондық поштаңызды енгізіңіз',
    enterPassword: 'Құпия сөзіңізді енгізіңіз',
    loggingIn: 'Кіру орындалуда...',
    noAccount: 'Тіркелгіңіз жоқ па?',
    registerHere: 'Мұнда тіркеліңіз',
    
    // Tooltips & Hints
    tooltipTheme: 'Тақырыпты ауыстыру',
    tooltipLang: 'Тілді өзгерту',
    tooltipSearch: 'Іздеу',
    tooltipProfile: 'Профильді көру',
    tooltipLogout: 'Шығу',
    tooltipAdmin: 'Әкімші панелі',
    tooltipBack: 'Артқа',
    tooltipAnalyze: 'Талдауды бастау',
    tooltipHistory: 'Тарихты көру',
    tooltipCopy: 'Буферге көшіру',
    tooltipShare: 'Нәтижемен бөлісу',
    tooltipDelete: 'Жою',
    tooltipEdit: 'Өңдеу',
    tooltipSave: 'Өзгерістерді сақтау',
    tooltipCancel: 'Болдырмау',
    
    // Error messages
    errorInvalidCredentials: 'Жарамсыз электрондық пошта немесе құпия сөз',
    errorRequired: 'Бұл өріс міндетті',
    errorWeakPassword: 'Құпия сөзде үлкен/кіші әріптер, сандар және арнайы таңбалар болуы керек',
    errorEmailExists: 'Бұл электрондық пошта тіркелген',
    errorServerError: 'Сервер қатесі. Кейінірек қайталап көріңіз',
    errorConnectionError: 'Байланыс қатесі. Интернет байланысын тексеріңіз',
    errorInvalidEmail: 'Жарамды электрондық пошта мекенжайын енгізіңіз',
    errorPasswordMismatch: 'Құпия сөздер сәйкес емес',
    errorLoginRequired: 'Жалғастыру үшін кіріңіз',
    errorAccessDenied: 'Рұқсат жоқ. Сізде бұл бетті көру үшін рұқсат жоқ',
    
    // Admin login hint
    adminLoginHint: 'Әкімші ретінде кіру үшін admin@example.com / Admin123! қолданыңыз',
    
    // Contact Page
    name: 'Аты',
    message: 'Хабарлама',
    yourName: 'Сіздің атыңыз',
    yourEmail: 'Сіздің электрондық поштаңыз',
    yourMessage: 'Сіздің хабарламаңыз',
    sendMessage: 'Хабарлама жіберу',
    sending: 'Жіберу...',
    helpQuestion: 'Сұрақтарыңыз бар ма? Біз көмектесуге дайынбыз!',
    emailUs: 'Бізге электрондық пошта жіберіңіз:',
    messageSent: 'Сіздің хабарламаңыз сәтті жіберілді!',
    failedToSend: 'Хабарлама жіберу мүмкін болмады',
    
    // Detailed Analysis  
    analysisExplanation: 'Талдау түсіндірмесі:',
    classificationResults: 'Жіктеу нәтижелері:',
    misleadingInformation: 'жаңылыстыратын ақпарат:',
    reliableNews: 'сенімді жаңалықтар:',
    fakeNews: 'жалған жаңалықтар:',
    confidenceExplanation: 'Бұл мазмұн ықтимал сенімсіз деп анықталды, сенімділік деңгейі',
    misleadingContent: 'Мәтінде жаңылыстыратын немесе жалған ақпаратпен байланысты элементтер бар.',
    algorithmicAssessment: 'Ескерту: Бұл алгоритмдік бағалау және оны басқа тексеру әдістерімен бірге қолдану керек.',
    headline: 'Тақырып:',
    contentSummary: 'Мазмұнның қысқаша сипаттамасы:',
    
    // Добавляем отзывы
    whatOurUsersSay: "Біздің пайдаланушылар не айтады",
    testimonial1: "Бұл құрал менің репортаждарымдағы жаңалық көздерін тексеру әдісін түбегейлі жақсартты. Ол жылдам, дәл және маған журналистік адалдықты сақтауға көмектеседі.",
    testimonial2: "Менің студенттерім енді бұл платформаны медиа сауаттылыққа оқыту үшін пайдаланады. Бұл олардың жаңалық мазмұнын талдау және түсіндіру әдісін өзгертті.",
    testimonial3: "Бұл құралды біздің ұйымға енгізу біздің коммуникациялардағы жалған ақпараттың таралуын айтарлықтай азайтты.",
    journalist: "Журналист",
    universityProfessor: "Университет профессоры",
    communicationsDirector: "Коммуникация директоры",
    whyUseFakeNewsDetector: "Fake News Detector-ді неге қолдану керек?",
    platformDescription: "Біздің AI қолданылған платформа сіз тұтынатын және бөлісетін мазмұн туралы ақпараттандырылған шешім қабылдауға көмектеседі.",
    
    // Добавляем профиль
    yourProfile: "Сіздің профиліңіз",
    updateProfile: "Профильді жаңарту",
    changePassword: "Құпия сөзді өзгерту",
    currentPassword: "Ағымдағы құпия сөз",
    newPassword: "Жаңа құпия сөз",
    confirmNewPassword: "Жаңа құпия сөзді растаңыз",
    
    // Admin Statistics
    userStatistics: 'Пайдаланушылар статистикасы',
    backToAdminPanel: 'Әкімші панеліне оралу',
    loadingStatistics: 'Статистика жүктелуде...',
    generalStatistics: 'Жалпы статистика',
    registeredAccounts: 'Тіркелген аккаунттар',
    newsChecksPerformed: 'Жаңалықтарды тексеру орындалды',
    fakeNewsPercentage: 'Жалған жаңалықтар пайызы',
    realNewsPercentage: 'Шынайы жаңалықтар пайызы',
    avgFakeNewsDetected: 'Жалған деп анықталған жаңалықтардың орташа пайызы',
    avgRealNewsDetected: 'Шынайы деп анықталған жаңалықтардың орташа пайызы',
    topActiveUsers: 'Ең белсенді 5 пайдаланушы',
    noDataAvailableYet: 'Әзірге мәліметтер жоқ',
    checksPerformed: 'тексеру орындалды',
    userContribution: 'Әр пайдаланушының жаңалықтарды тексеруге қосқан үлесі',
    userManagement: 'Пайдаланушыларды басқару',
    allRoles: 'Барлық рөлдер',
    noUsersFound: 'Критерийлерге сәйкес пайдаланушылар табылмады',
    filteredUsers: 'Сүзілген',
    users: 'пайдаланушылар',
  }
};

export const LanguageProvider = ({ children }) => {
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    // Default to English if no language preference is saved
    return savedLanguage || 'en';
  };

  const [language, setLanguage] = useState(getInitialLanguage);
  const [texts, setTexts] = useState(translations[getInitialLanguage()]);

  useEffect(() => {
    // Update texts when language changes
    setTexts(translations[language]);
    // Save language preference
    localStorage.setItem('language', language);
    // Add lang attribute to html for accessibility
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Change language
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 