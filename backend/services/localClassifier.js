// Простой локальный классификатор новостей без использования внешних API
const analyzeNews = (title, description) => {
  // Объединяем заголовок и содержание для анализа
  const fullText = (title + ' ' + description).toLowerCase();
  
  // Ключевые слова, которые часто встречаются в фейковых новостях
  const fakeNewsKeywords = [
    'шокирующий', 'шок', 'сенсация', 'сенсационный', 'невероятный',
    'правительство скрывает', 'они не хотят чтобы вы знали', 'тайно',
    'раскрыто', 'теория заговора', 'заговор', 'все врут', 'врачи скрывают',
    'не рассказывают', 'запрещенный', 'молчат', 'вас обманывают',
    'exclusive', 'shocking', 'shock', 'sensational', 'incredible', 
    'government hides', 'they don\'t want you to know', 'secretly',
    'revealed', 'conspiracy theory', 'conspiracy', 'everyone is lying',
    'doctors are hiding', 'not telling', 'banned', 'silent', 'deceiving you',
    'шокуюча', 'сенсація', 'неймовірний', 'уряд приховує', 'вони не хочуть',
    'таємно', 'розкрито', 'теорія змови', 'змова', 'всі брешуть', 'обманюють'
  ];
  
  // Признаки надежных новостей
  const reliableNewsPatterns = [
    'по словам исследователей', 'ученые утверждают', 'согласно исследованию',
    'исследование опубликовано в', 'по данным', 'согласно статистике',
    'эксперты считают', 'как утверждают специалисты', 'согласно опросу',
    'according to researchers', 'scientists say', 'according to a study',
    'research published in', 'according to data', 'according to statistics',
    'experts say', 'specialists claim', 'according to a survey',
    'за словами дослідників', 'вчені стверджують', 'згідно з дослідженням',
    'дослідження опубліковано в', 'за даними', 'згідно зі статистикою'
  ];
  
  // Посчитаем количество совпадений для каждой категории
  let fakeScore = 0;
  let reliableScore = 0;
  
  // Проверяем на ключевые слова фейковых новостей
  fakeNewsKeywords.forEach(keyword => {
    if (fullText.includes(keyword)) {
      fakeScore += 1;
    }
  });
  
  // Проверяем на паттерны надежных новостей
  reliableNewsPatterns.forEach(pattern => {
    if (fullText.includes(pattern)) {
      reliableScore += 2; // Придаём больший вес признакам надежности
    }
  });
  
  // Проверяем длину текста (слишком короткие часто ненадежны)
  const wordCount = fullText.split(/\s+/).length;
  if (wordCount < 50) {
    fakeScore += 1;
  } else if (wordCount > 200) {
    reliableScore += 1; // Подробные статьи обычно более надежны
  }
  
  // Проверяем наличие чисел (статьи с цифрами чаще достоверны)
  const hasNumbers = /\d+/.test(fullText);
  if (hasNumbers) {
    reliableScore += 1;
  }
  
  // Проверяем частоту восклицательных и вопросительных знаков (много эмоций - чаще фейк)
  const exclamationCount = (fullText.match(/!/g) || []).length;
  const questionCount = (fullText.match(/\?/g) || []).length;
  
  if (exclamationCount > 3 || questionCount > 5) {
    fakeScore += 2;
  }
  
  // Рассчитываем финальную оценку и пороговое значение
  const totalScore = fakeScore + reliableScore;
  // Нормализуем оценку на шкале от 0 до 100
  let reliabilityPercentage = totalScore > 0 ? Math.round((reliableScore / totalScore) * 100) : 50;
  
  // Ограничиваем минимальным и максимальным значением для избежания крайних оценок
  reliabilityPercentage = Math.min(Math.max(reliabilityPercentage, 10), 90);
  
  // Если текст слишком короткий для анализа, предполагаем нейтральный результат
  if (wordCount < 15) {
    reliabilityPercentage = 50;
  }
  
  // Определяем результат: реальная новость или фейк
  const isReal = reliabilityPercentage >= 50;
  
  // Формируем объяснение для пользователя
  let analysis = `${isReal ? "REAL" : "FAKE"} ${reliabilityPercentage}%\n\n`;
  analysis += "Analysis:\n";
  analysis += `This article was analyzed with our local algorithm to detect potential signs of fake news.\n\n`;
  analysis += `Title: "${title}"\n`;
  analysis += `Content summary: The article contains ${wordCount} words.\n\n`;
  
  if (exclamationCount > 3) {
    analysis += "• The text contains multiple exclamation marks, which is common in emotionally charged or sensationalist content.\n";
  }
  
  if (hasNumbers) {
    analysis += "• The article contains numerical data, which may indicate factual reporting.\n";
  }
  
  if (wordCount < 50) {
    analysis += "• The text is relatively short, which may provide insufficient context for a complete story.\n";
  } else if (wordCount > 200) {
    analysis += "• The article is detailed, which is common in thorough reporting.\n";
  }
  
  // Добавим найденные паттерны
  const foundReliablePatterns = reliableNewsPatterns.filter(pattern => fullText.includes(pattern));
  if (foundReliablePatterns.length > 0) {
    analysis += "• The article references sources or experts, which is typical of fact-based reporting.\n";
  }
  
  const foundFakePatterns = fakeNewsKeywords.filter(keyword => fullText.includes(keyword));
  if (foundFakePatterns.length > 0) {
    analysis += "• The article contains potentially sensationalist language.\n";
  }
  
  analysis += `\nCredibility score: ${reliabilityPercentage}%\n`;
  analysis += "\nNote: This is a simple algorithmic assessment and should be used alongside other verification methods.";
  
  return {
    result: isReal,
    confidencePercentage: isReal ? reliabilityPercentage : 100 - reliabilityPercentage,
    analysis: analysis,
    title: title,
    description: description
  };
};

module.exports = {
  analyzeNews
}; 