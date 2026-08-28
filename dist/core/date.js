export const DAY = 86400000;
export function parseDate(s) { return new Date(`${s}T00:00:00Z`); }
export function formatDate(d) { return d.toISOString().slice(0, 10); }
export function addDays(s, n) { return formatDate(new Date(parseDate(s).getTime() + n * DAY)); }
export function daysBetween(a, b) { return Math.floor((parseDate(b).getTime() - parseDate(a).getTime()) / DAY); }
export function weekday(s) { return parseDate(s).getUTCDay(); }
export function arDate(s) { return new Intl.DateTimeFormat('ar-SA-u-ca-gregory', { dateStyle: 'full' }).format(parseDate(s)); }
export function hijriDate(s) { return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { dateStyle: 'medium' }).format(parseDate(s)); }
