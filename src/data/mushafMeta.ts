import {PageMeta} from '../core/types.js';
const starts=[1,22,42,62,82,102,121,142,162,182,202,222,242,262,282,302,322,342,362,382,402,422,442,462,482,502,522,542,562,582];
export function getPageMeta(page:number):PageMeta{const juz=Math.min(30,Math.max(1,starts.findIndex((s,i)=>page>=s&&(starts[i+1]===undefined||page<starts[i+1]))+1));return{page,surah:page<=1?'الفاتحة':page<=49?'البقرة':page<=76?'آل عمران':page<=106?'النساء':page<=127?'المائدة':`بيانات السورة قابلة للاستبدال للصفحة ${page}`,juz,hizb:Math.ceil(juz*2-1+(page-starts[juz-1])/10),quarter:'تقريبي'};}
