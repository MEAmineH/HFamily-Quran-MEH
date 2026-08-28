import { createInitialState } from './defaults.js';
const KEY = 'quran-memorization-app-v1';
export function loadState() { if (typeof localStorage === 'undefined')
    return createInitialState(); const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : createInitialState(); }
export function saveState(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
export function resetState() { localStorage.removeItem(KEY); }
