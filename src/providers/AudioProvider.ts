export interface AudioProvider{getAudioUrl(page:number):string|undefined;getSourceName():string}
export const emptyAudioProvider:AudioProvider={getAudioUrl:()=>undefined,getSourceName:()=> 'لا يوجد مصدر صوت مدمج؛ يمكن ربط مصدر موثوق لاحقًا'};
