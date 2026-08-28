import {AppState} from './types.js';import {createInitialState} from './defaults.js';
const KEY='quran-memorization-app-v1';
export function loadState():AppState{if(typeof localStorage==='undefined')return createInitialState();const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw) as AppState:createInitialState()}
export function saveState(s:AppState){localStorage.setItem(KEY,JSON.stringify(s))}
export function resetState(){localStorage.removeItem(KEY)}
