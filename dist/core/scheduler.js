import { addDays, daysBetween, weekday } from './date.js';
export function calculateRemainingPages(s) { return Math.max(0, s.totalPages - s.lastMemorizedPage); }
export function calculateProgress(s) { const memorized = Math.min(s.totalPages, s.lastMemorizedPage); return { memorizedPages: memorized, remainingPages: calculateRemainingPages(s), percent: Math.round((memorized / s.totalPages) * 1000) / 10, completedJuz: Math.floor(memorized / (s.totalPages / 30)) }; }
export function isMemorizationDay(date, s) { return s.memorizationDays.includes(weekday(date)); }
export function calculateEstimatedCompletionDate(state, from = state.settings.startDate) { let date = from, remaining = calculateRemainingPages(state.settings), guard = 5000; while (remaining > 0 && guard-- > 0) {
    if (isMemorizationDay(date, state.settings) && !state.postponedDates.includes(date))
        remaining -= state.settings.newPagesPerDay;
    if (remaining > 0)
        date = addDays(date, 1);
} return date; }
export function nextNewPages(state, date) { if (!isMemorizationDay(date, state.settings))
    return []; const start = state.settings.lastMemorizedPage + 1; return Array.from({ length: state.settings.newPagesPerDay }, (_, i) => start + i).filter(p => p <= state.settings.totalPages); }
const priority = { repeat: 0, weak: 1, good: 3, excellent: 4 };
export function getTodayReviews(state, date, limit = state.settings.dailyReviewPages) { return Object.values(state.pages).filter(p => p.nextReview <= date).sort((a, b) => (priority[a.lastRating ?? 'good'] - priority[b.lastRating ?? 'good']) || daysBetween(a.nextReview, date) - daysBetween(b.nextReview, date) || a.page - b.page).slice(0, limit); }
export function generateDailyPlan(state, date) { const reviews = getTodayReviews(state, date, state.settings.allowExtraReviews ? 999 : state.settings.dailyReviewPages); const overdue = Object.values(state.pages).filter(p => p.nextReview < date).length; const wd = weekday(date); return { date, isMemorizationDay: isMemorizationDay(date, state.settings), newPages: nextNewPages(state, date), reviews, overdueCount: overdue, suggestion: wd === 5 ? 'اقتراح اختياري: تسميع أوجه الأسبوع الخمسة دون إلزام.' : wd === 6 ? 'يوم خفيف: راحة أو استماع أو مراجعة أخطاء دون عقوبة.' : undefined }; }
export function generateWeeklyPlan(state, start) { return Array.from({ length: 7 }, (_, i) => generateDailyPlan(state, addDays(start, i))); }
export function generateFullSchedule(state) { const plans = []; let sim = structuredClone(state); let date = state.settings.startDate, guard = 2000; while (sim.settings.lastMemorizedPage < sim.settings.totalPages && guard-- > 0) {
    plans.push(generateDailyPlan(sim, date));
    if (isMemorizationDay(date, sim.settings))
        sim.settings.lastMemorizedPage = Math.min(sim.settings.totalPages, sim.settings.lastMemorizedPage + sim.settings.newPagesPerDay);
    date = addDays(date, 1);
} return plans; }
export function scheduleReview(page, rating, date, s) { return { ...page, reviewCount: page.reviewCount + 1, lastReviewed: date, lastRating: rating, nextReview: addDays(date, s.reviewIntervals[rating]), nearReviewStage: undefined }; }
export function recordReviewResult(state, page, rating, date, notes) { const current = state.pages[page] ?? { page, reviewCount: 0, nextReview: date }; return { ...state, pages: { ...state.pages, [page]: { ...scheduleReview(current, rating, date, state.settings), notes: notes ?? current.notes } }, history: [...state.history, { date, type: 'review', page, rating, notes }] }; }
export function completeNewMemorization(state, page, date, notes) { const next = Math.max(state.settings.lastMemorizedPage, page); const record = { page, firstMemorized: date, reviewCount: 0, lastRating: 'good', nextReview: addDays(date, 1), notes, nearReviewStage: 0 }; return { ...state, settings: { ...state.settings, lastMemorizedPage: next, memorizedPages: next }, pages: { ...state.pages, [page]: record }, history: [...state.history, { date, type: 'memorization', page, notes }] }; }
export function postponeDay(state, date, action = 'postponed') { return { ...state, postponedDates: [...new Set([...state.postponedDates, date])], history: [...state.history, { date, type: 'postpone', action }] }; }
export function reschedulePlan(state, settings) { return { ...state, settings: { ...state.settings, ...settings, reviewIntervals: { ...state.settings.reviewIntervals, ...settings.reviewIntervals } }, history: [...state.history, { date: new Date().toISOString().slice(0, 10), type: 'settings', notes: 'تحديث الإعدادات وإعادة توليد المستقبل دون حذف السجل' }] }; }
