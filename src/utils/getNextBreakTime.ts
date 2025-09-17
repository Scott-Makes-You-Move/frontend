// MVP assumption: Netherlands is currently in UTC+2 (CEST)
// This will need to change to UTC+1 when daylight savings ends
const breakTimes = ['10:00', '13:30', '15:00'];
const timezoneOffsetMinutes = 120; // 2 * 60 = 120 minutes

export const getNextBreakTime = (): string => {
  const now = new Date();

  const nlTime = new Date(now.getTime() + timezoneOffsetMinutes * 60 * 1000);
  const currentMinutes = nlTime.getHours() * 60 + nlTime.getMinutes();

  let nextBreak = breakTimes[0];
  for (const time of breakTimes) {
    const [h, m] = time.split(':').map(Number);
    const breakMinutes = h * 60 + m;

    if (breakMinutes > currentMinutes) {
      nextBreak = time;
      break;
    }
  }
  return nextBreak;
};
