export const DAY=86400000;
export function parseDate(s:string){return new Date(`${s}T00:00:00Z`)}
export function formatDate(d:Date){return d.toISOString().slice(0,10)}
export function addDays(s:string,n:number){return formatDate(new Date(parseDate(s).getTime()+n*DAY))}
export function daysBetween(a:string,b:string){return Math.floor((parseDate(b).getTime()-parseDate(a).getTime())/DAY)}
export function weekday(s:string){return parseDate(s).getUTCDay()}
export function arDate(s:string){return new Intl.DateTimeFormat('ar-SA-u-ca-gregory',{dateStyle:'full'}).format(parseDate(s))}
export function hijriDate(s:string){return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura',{dateStyle:'medium'}).format(parseDate(s))}
