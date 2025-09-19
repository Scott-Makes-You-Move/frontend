const breakTimes = ['10:00', '13:30', '15:00'];

export const getNextBreakTime = (): string => {
  const now = new Date();

  // Format current time in NL timezone
  const formatter = new Intl.DateTimeFormat('nl-NL', {
    timeZone: 'Europe/Amsterdam',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const hours = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minutes = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const currentMinutes = hours * 60 + minutes;

  for (const time of breakTimes) {
    const [h, m] = time.split(':').map(Number);
    const breakMinutes = h * 60 + m;

    if (breakMinutes > currentMinutes) {
      return time;
    }
  }

  // All breaks passed then return tomorrow's first break
  return breakTimes[0];
};
