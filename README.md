# Bloom Coffee ☕

موقع ويب احترافي وتفاعلي لمقهى ومشروبات، بهوية بصرية مستوحاة من القهوة:
Espresso, Coffee, Caramel, Gold, Cream، مع لمسة Sage مميزة.

## الصفحات

| الصفحة | الملف |
|---|---|
| الرئيسية | `index.html` |
| القائمة مع البحث والتصفية | `menu.html` |
| تفاصيل المشروب | `product.html` |
| العروض والباقات | `offers.html` |
| من نحن | `about.html` |
| تواصل معنا | `contact.html` |

## المميزات

- تصميم متجاوب بالكامل (Desktop / Tablet / Mobile)
- دعم العربية والإنجليزية مع تبديل RTL / LTR
- سلة مشتريات تفاعلية + مفضلة محفوظتان في `localStorage`
- تغيير الكميات وحساب الإجمالي تلقائيًا
- بحث فوري وتصفية حسب 6 تصنيفات
- إشعارات Toast لكل عملية
- نافذة تفاصيل العروض وإضافة الباقات للسلة
- نموذج تواصل مع تحقق ورسائل نجاح
- خريطة قابلة للتعديل في `contact.html`
- صور محلية عالية الجودة داخل `assets/images`

## التقنيات

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript (Vanilla, ES6)
- Google Fonts: Tajawal + Playfair Display + Inter

## التشغيل محليًا

```bash
npx serve .
```

ثم افتح `http://localhost:3000`.

## البنية

```
.
├── index.html
├── menu.html
├── product.html
├── offers.html
├── about.html
├── contact.html
├── css/styles.css
├── js/data.js
├── js/app.js
└── assets/images/
```

## تخصيص المحتوى

- المنتجات والأسعار والعروض والترجمات: `js/data.js`
- الألوان والخطوط: متغيرات CSS في بداية `css/styles.css`
- موقع الخريطة: تعديل رابط iframe في `contact.html`

---

© 2026 Bloom Coffee
