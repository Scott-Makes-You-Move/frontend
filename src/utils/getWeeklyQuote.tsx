type QuoteEntry = {
  week: number;
  text: string;
  author: string;
};

export const getCurrentWeekNumber = (): number => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

export const getWeeklyQuote = (quotes: QuoteEntry[]): QuoteEntry => {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    throw new Error('Quotes array must not be empty.');
  }

  const weekNumber = getCurrentWeekNumber();
  const index = (weekNumber - 1) % quotes.length;
  return quotes[index];
};
