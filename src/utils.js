import { DAYS, WEEKDAY_SCHEDULE, WEEKEND_SAT_SCHEDULE, WEEKEND_SUN_SCHEDULE } from './data';

export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function getWeekKey() {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil((((d - jan1) / 86400000) + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function getBiweekKey() {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil((((d - jan1) / 86400000) + jan1.getDay() + 1) / 7);
  const bw = Math.ceil(week / 2);
  return `${d.getFullYear()}-BW${String(bw).padStart(2, '0')}`;
}

export function getDayKey(dayIdx) {
  return DAYS[dayIdx].substring(0, 3);
}

export function getScheduleForDay(dayIdx) {
  if (dayIdx === 5) return WEEKEND_SAT_SCHEDULE;
  if (dayIdx === 6) return WEEKEND_SUN_SCHEDULE;
  return WEEKDAY_SCHEDULE;
}

export function getTodayDayIdx() {
  return new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
}

export function formatDate() {
  const d = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  return d.toLocaleDateString('en-IN', opts).toUpperCase();
}
