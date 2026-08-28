const assert = { equal(actual, expected) { if (actual !== expected)
        throw new Error(`Expected ${String(expected)} got ${String(actual)}`); }, ok(value) { if (!value)
        throw new Error('Expected truthy value'); }, deepEqual(actual, expected) { const a = JSON.stringify(actual); const e = JSON.stringify(expected); if (a !== e)
        throw new Error(`Expected ${e} got ${a}`); } };
import { createInitialState, defaultSettings } from '../core/defaults.js';
import { calculateEstimatedCompletionDate, calculateProgress, calculateRemainingPages, completeNewMemorization, generateDailyPlan, generateWeeklyPlan, getTodayReviews, postponeDay, recordReviewResult, reschedulePlan } from '../core/scheduler.js';
function state() { return createInitialState({ ...defaultSettings, startDate: '2026-09-01' }); }
let s = state();
assert.equal(calculateRemainingPages(s.settings), 444);
assert.equal(calculateProgress(s.settings).percent, 26.5);
assert.deepEqual(generateWeeklyPlan(state(), '2026-09-01').map(d => d.isMemorizationDay), [true, true, true, false, false, true, true]);
let p = generateDailyPlan(state(), '2026-09-01');
assert.deepEqual(p.newPages, [161]);
assert.equal(p.reviews.length, 4);
s = state();
s = recordReviewResult(s, 10, 'excellent', '2026-08-01');
s = recordReviewResult(s, 11, 'repeat', '2026-08-31');
s = recordReviewResult(s, 12, 'weak', '2026-08-29');
let r = getTodayReviews(s, '2026-09-01', 4);
assert.equal(r.length, 4);
assert.equal(r[0].page, 11);
assert.equal(r[1].page, 12);
s = state();
s = recordReviewResult(s, 1, 'excellent', '2026-09-01');
assert.equal(s.pages[1].nextReview, '2026-09-15');
s = recordReviewResult(s, 1, 'repeat', '2026-09-15');
assert.equal(s.pages[1].nextReview, '2026-09-16');
s = completeNewMemorization(state(), 161, '2026-09-01');
assert.equal(s.settings.lastMemorizedPage, 161);
assert.equal(s.pages[161].nextReview, '2026-09-02');
s = postponeDay(state(), '2026-09-01');
assert.ok(s.postponedDates.includes('2026-09-01'));
assert.deepEqual(generateDailyPlan(s, '2026-09-02').newPages, [161]);
s = reschedulePlan(state(), { lastMemorizedPage: 603, memorizedPages: 603 });
assert.deepEqual(generateDailyPlan(s, '2026-09-01').newPages, [604]);
s = completeNewMemorization(s, 604, '2026-09-01');
assert.equal(calculateEstimatedCompletionDate(s, '2026-09-01'), '2026-09-01');
const base = state();
const fewer = reschedulePlan(base, { memorizationDays: [0, 1] });
assert.ok(calculateEstimatedCompletionDate(fewer, '2026-09-01') > calculateEstimatedCompletionDate(base, '2026-09-01'));
s = reschedulePlan(state(), { dailyReviewPages: 6 });
assert.equal(generateDailyPlan(s, '2026-09-01').reviews.length, 6);
console.log('scheduler tests passed');
