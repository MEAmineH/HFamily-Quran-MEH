# HFamily Quran Memorization Planner

تطبيق ويب ثابت وشخصي لحفظ ومراجعة القرآن الكريم بواجهة عربية RTL، يعمل محليًا دون Backend ودون مفاتيح API ودون اعتماديات خارجية وقت التشغيل أو البناء.

## التشغيل السريع

```bash
npm run build
npm run dev
# أو لخدمة مجلد dist وحده:
npm run dev:dist
```

ثم افتح:

```text
http://127.0.0.1:4173/
```

يمكن تشغيل الموقع بطريقتين: من جذر المستودع حيث يحمّل `index.html` الملفات المبنية من `./dist/`، أو برفع محتوى مجلد `dist/` وحده على أي استضافة static. يستخدم ملف `dist/index.html` مسارات نسبية (`./main.js` و`./styles.css`) حتى لا تظهر صفحة فارغة عند النشر تحت subpath.

## الفحوصات

```bash
npm test
npm run lint
npm run build
```

## ملاحظات مهمة

- لا تحتاج إلى `npm install`؛ لا توجد dependencies في `package.json`.
- أمر `npm run build` يتحقق من الملفات الثابتة فقط ولا يستدعي TypeScript أو bundler خارجي.

- لا يحتوي التطبيق على نص القرآن الكريم أو صور مصحف أو ملفات صوتية غير مرخصة.
- طبقات `QuranPageProvider` و`AudioProvider` موجودة لتسهيل ربط مصادر موثوقة لاحقًا.
- التخزين محلي في المتصفح عبر `localStorage`.
- تاريخ البداية الافتراضي: `2026-09-01`.
