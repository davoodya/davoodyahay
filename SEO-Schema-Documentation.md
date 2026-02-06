# مستندات Schema Markup های اضافه شده برای SEO

## 📋 خلاصه تغییرات

به صفحه **articles.html** سه Schema مارکاپ اصلی برای بهبود SEO اضافه شده است:

1. **WebPage Schema** - برای معرفی صفحه مقالات
2. **ItemList Schema** - برای لیست کردن تمام مقالات
3. **Person Schema** - برای معرفی نویسنده (داوود یاحی)

---

## 🎯 Schema های اضافه شده

### 1. WebPage Schema

این Schema اطلاعات کلی صفحه مقالات را به موتورهای جستجو معرفی می‌کند.

**ویژگی‌های کلیدی:**
- ✅ شناسایی صفحه به عنوان یک WebPage
- ✅ ارتباط با نویسنده (Person Schema)
- ✅ قابلیت جستجو (SearchAction)
- ✅ ارتباط با Breadcrumb و ItemList

**مزایای SEO:**
- بهبود نمایش در نتایج جستجو
- نمایش جعبه جستجو در Google
- ارتباط منطقی بین صفحات

---

### 2. ItemList Schema

این Schema لیست تمام مقالات موجود در صفحه را به صورت ساختاریافته معرفی می‌کند.

**ویژگی‌های کلیدی:**
- ✅ معرفی 3 مقاله موجود
- ✅ هر مقاله شامل: عنوان، توضیحات، تصویر، تاریخ انتشار، نویسنده
- ✅ دسته‌بندی و کلمات کلیدی برای هر مقاله
- ✅ ترتیب position برای هر مقاله

**مقالات معرفی شده:**

#### مقاله 1: کرک فایلهای ZIP با ابزار BK-Crack
- **URL**: `/pages/articles/hacking/CrackZIPFiles1.html`
- **دسته**: امنیت سایبری
- **تاریخ**: 15 فروردین 1404
- **کلمات کلیدی**: تست نفوذ، Password Cracking، هک و امنیت، BKCrack

#### مقاله 2: مفاهیم Encoding, Encryption, Hashing, Obfuscation
- **URL**: `/pages/articles/Security/hash_encrypt.html`
- **دسته**: امنیت سایبری
- **تاریخ**: 23 خرداد 1404
- **کلمات کلیدی**: امنیت سایبری، برنامه نویسی، رمزنگاری

#### مقاله 3: کدگذاری Unicode و استاندارد ASCII
- **URL**: `/pages/articles/Security/unicode.html`
- **دسته**: برنامه نویسی
- **تاریخ**: 24 خرداد 1404
- **کلمات کلیدی**: برنامه نویسی، Unicode، ASCII، کدگذاری

**مزایای SEO:**
- نمایش Rich Results در Google
- بهبود نرخ کلیک (CTR)
- امکان نمایش carousel در نتایج جستجو
- بهبود indexing مقالات

---

### 3. Person Schema (Author)

این Schema اطلاعات کامل نویسنده (داوود یاحی) را معرفی می‌کند.

**ویژگی‌های کلیدی:**
- ✅ نام و نام‌های جایگزین (Davood Yahay, DavoodSec)
- ✅ عناوین شغلی متعدد
- ✅ مهارت‌ها و تخصص‌ها (knowsAbout)
- ✅ زبان‌های مسلط (فارسی و انگلیسی)
- ✅ سازمان‌های تحت مالکیت (DSecurity, YakuzaDev, YaWeb)
- ✅ خدمات ارائه شده (Penetration Testing, Consulting, Tool Development)
- ✅ لینک‌های شبکه‌های اجتماعی (sameAs)

**مزایای SEO:**
- معرفی شما به عنوان متخصص به Google
- امکان نمایش Knowledge Panel
- افزایش اعتبار و E-E-A-T
- بهبود نمایش در نتایج جستجوی شخصی

---

## 📊 تاثیرات مثبت بر SEO

### 1. Rich Results
- امکان نمایش Article Carousel
- نمایش تصویر، تاریخ، و نویسنده در نتایج
- افزایش Click-Through Rate (CTR)

### 2. Knowledge Graph
- معرفی شما به عنوان متخصص به Google
- امکان نمایش پنل اطلاعات در سمت راست گوگل

### 3. بهبود Indexing
- درک بهتر محتوا توسط موتورهای جستجو
- indexing سریعتر مقالات جدید

### 4. E-E-A-T
- Experience: تجربه 10+ ساله
- Expertise: تخصص در امنیت سایبری
- Authoritativeness: معرفی به عنوان متخصص
- Trustworthiness: لینک‌های شبکه‌های اجتماعی

---

## 🔧 نکات فنی

### تست صحت Schema ها
برای تست صحت Schema های اضافه شده از ابزارهای زیر استفاده کنید:

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```

2. **Schema.org Validator**
   ```
   https://validator.schema.org/
   ```

3. **Google Search Console**
   - بخش Enhancement > Articles
   - بررسی خطاها و هشدارها

### نکات مهم

⚠️ **تاریخ‌ها**: تاریخ‌ها به فرمت ISO 8601 (YYYY-MM-DD) وارد شده‌اند. در صورت تغییر تاریخ مقالات، حتماً فرمت را رعایت کنید.

⚠️ **URL ها**: همه URL ها باید absolute باشند (شامل https://davoodya.ir)

⚠️ **تصاویر**: تصاویر باید حداقل 696px عرض داشته باشند برای نمایش در Rich Results

---

## 🚀 گام‌های بعدی (پیشنهادی)

### 1. افزودن Schema به مقالات منفرد
برای هر مقاله جداگانه می‌توانید Schema های زیر را اضافه کنید:
- **Article Schema** (با جزئیات بیشتر)
- **FAQPage Schema** (در صورت وجود سوالات متداول)
- **HowTo Schema** (برای مقالات آموزشی گام به گام)

### 2. افزودن VideoObject
اگر مقالات شامل ویدیو هستند، Schema مربوط به ویدیو را اضافه کنید.

### 3. افزودن Review/Rating
در صورت وجود نظرات کاربران، Schema های Review را اضافه کنید.

### 4. Organization Schema
برای معرفی سازمان DSecurity در صفحه اصلی.

---

## 📝 مثال استفاده در مقالات جدید

هنگام اضافه کردن مقاله جدید، آن را به ItemList Schema اضافه کنید:

```json
{
    "@type": "ListItem",
    "position": 4,
    "item": {
        "@type": "Article",
        "@id": "https://davoodya.ir/pages/articles/[category]/[article-name].html",
        "url": "https://davoodya.ir/pages/articles/[category]/[article-name].html",
        "headline": "عنوان مقاله",
        "description": "توضیحات مختصر مقاله",
        "image": "https://davoodya.ir/images/articles/[folder]/[image].jpg",
        "datePublished": "2025-XX-XX",
        "dateModified": "2025-XX-XX",
        "author": {
            "@id": "https://davoodya.ir/#person"
        },
        "publisher": {
            "@id": "https://davoodya.ir/#person"
        },
        "articleSection": "دسته بندی",
        "keywords": ["کلمه1", "کلمه2", "کلمه3"],
        "inLanguage": "fa-IR"
    }
}
```

---

## ✅ چک لیست نهایی

- [x] WebPage Schema اضافه شده
- [x] ItemList Schema با 3 مقاله اضافه شده
- [x] Person Schema (نویسنده) اضافه شده
- [x] تمام URL ها absolute هستند
- [x] تاریخ‌ها به فرمت ISO 8601
- [x] ارتباطات بین Schema ها با @id تعریف شده
- [ ] تست با Google Rich Results Test
- [ ] بررسی در Google Search Console
- [ ] مانیتورینگ نتایج در 2-4 هفته آینده

---

## 🔗 منابع مفید

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Article Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Search Central - Person Structured Data](https://developers.google.com/search/docs/appearance/structured-data/person)
- [JSON-LD Playground](https://json-ld.org/playground/)

---

**تاریخ ایجاد**: 6 فوریه 2026  
**نسخه**: 1.0  
**نویسنده**: DavoodSec

---

## 📄 Schema های صفحات دیگر

### صفحه Portfolio (نمونه ابزارها)

#### Schema های اضافه شده:
1. **Person & CreativeWork Schema** - معرفی شما به عنوان خالق ابزارهای امنیتی
2. **SoftwareApplication Schema** - معرفی 6 ابزار امنیتی توسعه داده شده
3. **WebPage Schema** - معرفی صفحه نمونه ابزارها
4. **WebSite Schema** - معرفی وب‌سایت

#### ابزارهای معرفی شده:
- Yakuza Undetectable Backdoor
- C&C Yakuza Design
- Yakuza Password Cracker
- Python in Black Scripts
- YakuzaMalware Arsenal
- Yakuza WiFi Auditor

---

### صفحه Services (خدمات)

#### Schema های اضافه شده:
1. **Person Schema with Services** - معرفی شما با 13 سرویس تخصصی
2. **Offer Schema** - جزئیات کامل هر سرویس
3. **WebPage Schema** - معرفی صفحه خدمات
4. **WebSite Schema** - معرفی وب‌سایت

#### خدمات معرفی شده:
1. ساخت و توسعه ابزارهای امنیتی
2. راه‌اندازی شبکه‌های کامپیوتری
3. راه‌اندازی سیستم‌های فایروال و IDS/IPS
4. راه‌اندازی شبکه میکروتیک
5. امن‌سازی (Hardening)
6. تصحیح امنیتی کدنویسی
7. ساخت ربات‌های معامله‌گر
8. ادغام ابزارهای هوش مصنوعی
9. تست نفوذ قانونی
10. مشاوره امنیت سایبری
11. جرم‌یابی و بازیابی سیستم
12. تدریس علوم امنیت سایبری
13. پیاده‌سازی مجازی‌سازی و دیتاسنتر

---

### صفحه Skills (مهارت‌ها و مدارک)

#### Schema های اضافه شده:
1. **Person Schema with Skills** - معرفی شما با مهارت‌های تخصصی
2. **DefinedTerm Schema** - تعریف هر مهارت به صورت ساختاریافته
3. **EducationalOccupationalCredential Schema** - معرفی مدارک حرفه‌ای
4. **WebPage Schema** - معرفی صفحه مهارت‌ها
5. **WebSite Schema** - معرفی وب‌سایت

#### مهارت‌های معرفی شده:
- Penetration Testing
- Security Tool Development
- Network Security
- Malware Analysis
- Python Programming
- C++ Programming
- Network Administration (MikroTik, Cisco)
- Linux Administration
- Virtualization (VMware, Docker, Kubernetes)

#### مدارک معرفی شده:
- CCNA, CEH V12, OSCP
- LPIC-1, LPIC-2, RHCSA
- MTCNA, MTCRE, MTCWE, MTCTCE, MTCUME, MTCSE
- PCEP, PCAP, C++ Certified
- Security+

---

## 🎯 مزایای SEO اضافه شده برای صفحات جدید

### Portfolio Page:
✅ **معرفی به عنوان Developer** - Google شما را به عنوان توسعه‌دهنده ابزار شناسایی می‌کند  
✅ **Software Schema** - ابزارها در نتایج جستجو نمایش داده می‌شوند  
✅ **Creator Recognition** - شناسایی شما به عنوان خالق ابزارها  
✅ **GitHub Integration** - لینک مستقیم به مخازن GitHub

### Services Page:
✅ **Service Listings** - خدمات در Google Services نمایش داده می‌شوند  
✅ **Local SEO** - بهبود نتایج جستجوی محلی (ایران، اصفهان)  
✅ **Service Area** - تعیین محدوده ارائه خدمات  
✅ **Detailed Descriptions** - توضیحات کامل هر سرویس

### Skills Page:
✅ **Professional Profile** - پروفایل حرفه‌ای کامل  
✅ **Certification Recognition** - شناسایی مدارک توسط Google  
✅ **Skill Taxonomy** - دسته‌بندی ساختاریافته مهارت‌ها  
✅ **Credential Verification** - امکان اعتبارسنجی مدارک

---

## 🔧 نکات فنی مهم

### برای Portfolio:
- تمام URL های ابزارها باید به صفحات اختصاصی آن‌ها لینک شوند
- GitHub URLs باید معتبر باشند
- تصاویر ابزارها باید حداقل 696px عرض داشته باشند

### برای Services:
- `areaServed` مشخص می‌کند کجا خدمات ارائه می‌شود
- `serviceOutput` توضیح می‌دهد مشتری چه چیزی دریافت می‌کند
- `audience` مخاطبان هدف را تعریف می‌کند

### برای Skills:
- هر مهارت با `DefinedTerm` به صورت ساختاریافته تعریف شده
- مدارک با `hasCredential` به شخص مرتبط می‌شوند
- `recognizedBy` سازمان صادرکننده مدرک را مشخص می‌کند

---

## 📊 اولویت‌بندی Schema ها

### 1. **اولویت بالا (High Priority)**
- Person Schema (در همه صفحات)
- WebSite Schema (در همه صفحات)
- BreadcrumbList Schema (در همه صفحات)

### 2. **اولویت متوسط (Medium Priority)**
- SoftwareApplication Schema (Portfolio)
- Service/Offer Schema (Services)
- DefinedTerm Schema (Skills)

### 3. **اولویت پایین (Low Priority)**
- WebPage Schema (در همه صفحات)

---

## ✅ چک لیست نهایی برای هر صفحه

### Portfolio Page:
- [x] Person & CreativeWork Schema
- [x] SoftwareApplication Schema (6 ابزار)
- [x] WebPage Schema
- [x] WebSite Schema
- [x] BreadcrumbList Schema
- [ ] تست با Google Rich Results Test
- [ ] بررسی URL های GitHub

### Services Page:
- [x] Person Schema با 13 سرویس
- [x] Offer Schema برای هر سرویس
- [x] WebPage Schema
- [x] WebSite Schema
- [x] BreadcrumbList Schema
- [ ] تست با Google Rich Results Test
- [ ] بررسی area served

### Skills Page:
- [x] Person Schema با مهارت‌ها
- [x] DefinedTerm Schema (9 مهارت)
- [x] EducationalOccupationalCredential Schema (6 مدرک)
- [x] WebPage Schema
- [x] WebSite Schema
- [x] BreadcrumbList Schema
- [ ] تست با Google Rich Results Test
- [ ] بررسی تاریخ مدارک

---

## 🚀 گام‌های بعدی پیشنهادی

### 1. افزودن Review Schema
برای نمایش نظرات مشتریان در صفحه Services:
```json
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "نام مشتری"
  }
}
```

### 2. افزودن FAQPage Schema
برای سوالات متداول در صفحات مختلف

### 3. افزودن AggregateRating
برای نمایش امتیاز کلی خدمات

### 4. افزودن VideoObject
اگر ویدیوهای آموزشی دارید

---

## 📝 نمونه کد برای به‌روزرسانی

### اضافه کردن ابزار جدید به Portfolio:
```json
{
  "@type": "SoftwareApplication",
  "name": "نام ابزار جدید",
  "description": "توضیحات ابزار",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": ["Windows", "Linux"],
  "downloadUrl": "https://github.com/davoodya/tool-name",
  "programmingLanguage": ["Python"],
  "creator": {
    "@id": "https://davoodya.ir/#person"
  }
}
```

### اضافه کردن سرویس جدید به Services:
```json
{
  "@type": "Offer",
  "itemOffered": {
    "@type": "Service",
    "name": "نام سرویس جدید",
    "description": "توضیحات سرویس",
    "serviceType": "نوع سرویس",
    "provider": {
      "@id": "https://davoodya.ir/#person"
    },
    "areaServed": ["ایران"]
  }
}
```

### اضافه کردن مدرک جدید به Skills:
```json
{
  "@type": "EducationalOccupationalCredential",
  "name": "نام مدرک",
  "description": "توضیحات مدرک",
  "credentialCategory": "certificate",
  "recognizedBy": {
    "@type": "Organization",
    "name": "نام سازمان صادرکننده"
  },
  "dateCreated": "1403"
}
```

---

## 🔗 منابع مفید اضافی

- [Google Search Central - Software App](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Schema.org - Service](https://schema.org/Service)
- [Schema.org - DefinedTerm](https://schema.org/DefinedTerm)
- [Schema.org - EducationalOccupationalCredential](https://schema.org/EducationalOccupationalCredential)

---

**آخرین به‌روزرسانی**: 6 فوریه 2026  
**نسخه**: 2.0  
**نویسنده**: DavoodSec

## 📌 نکات پایانی

1. همیشه URL ها را absolute (کامل با https://) وارد کنید
2. تاریخ‌ها را به فرمت ISO 8601 یا شمسی استاندارد وارد کنید
3. تصاویر باید با کیفیت مناسب و با حجم بهینه باشند
4. هر 3-6 ماه یکبار Schema ها را به‌روزرسانی کنید
5. پس از هر تغییر، حتماً با Google Rich Results Test تست کنید

موفق باشید! 🚀
