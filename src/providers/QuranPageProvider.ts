import {PageMeta} from '../core/types.js';
import {getPageMeta} from '../data/mushafMeta.js';
export interface QuranPageProvider{getPage(page:number):PageMeta;getPageImageUrl?(page:number):string|undefined;getTrustedSourceName():string}
export const metadataOnlyQuranProvider:QuranPageProvider={getPage:getPageMeta,getTrustedSourceName:()=> 'بيانات وصفية محلية قابلة للاستبدال؛ لا تحتوي نص القرآن أو صور المصحف'};
