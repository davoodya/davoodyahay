## Assets Importing - Local & Online
### CSS
#### Main CSS - Index Page
```html
<!-- ################## Fontawesome Local & Online ################## -->
<link rel="stylesheet" href="assets/fontawesome/css/all.min.css?v=2.0.1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- ################## index.html - Main CSS Styles ################## -->
<link rel="stylesheet" href="css/header-footer.css?v=2.0.1" type="text/css">
<link rel="stylesheet" href="css/style-index.css?v=2.0.1" type="text/css">

<!-- ################## Google Fonts Importing ################## -->
<!-- Google Local -->
<link rel="stylesheet" href="assets/fonts/fira-code/fira-code.css?v=2.0.1">
<link rel="stylesheet" href="assets/fonts/Rajdhani/Rajdhani.css?v=2.0.1">
<!-- Google Online -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">

```

#### Farsi Font Importing
```html
<!-- ################## Shabnam - Main Descriptions - Local & Online ################## -->
<link rel="stylesheet" href="assets/css/fonts/Shabnam.css?v=2.0.1" type="text/css" />
<!-- <link href="https://cdn.fontcdn.ir/Font/Persian/Shabnam/Shabnam.css" rel="stylesheet" type="text/css" /> -->

<!-- ################## Vazir - for Titles - Local & Online ################## -->
<link href="assets/css/fonts/Vazir.css" rel="stylesheet" type="text/css">
<!-- <link href="https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css?v=2.0.1" rel="stylesheet" type="text/css" />-->

<!-- ################## YekanBakh - Second Description Font - Local & Online ################## -->
<link href="assets/css/fonts/Yekan-Bakh.css" rel="stylesheet" type="text/css">
<!-- <link href="https://cdn.fontcdn.ir/Font/Persian/Yekan-Bakh/Yekan-Bakh.css?v=2.0.1" rel="stylesheet" type="text/css" />-->

<!-- ################## Sahel - Third Description Font - Local & Online ################## -->
<link href="assets/css/fonts/Sahel.css" rel="stylesheet">
<!-- <link href="https://cdn.fontcdn.ir/Font/Persian/Sahel/Sahel.css?v=2.0.1" rel="stylesheet" type="text/css" />-->

<!-- All Persian Fonts in One Line -->
<link rel="stylesheet" href="assets/css/fonts/fonts.css" media="print" onload="this.media='all'">

```

#### Font Preloading to Increase Webpage Speed
```html
<!-- ################## Preload Fonts ################## -->
<!-- If fonts not loaded using <preload> for all local fonts in all weights -->
<link rel="preload" href="/assets/fonts/shabnam/Shabnam-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/shabnam/Shabnam-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/VazirMatn/Vazirmatn-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/VazirMatn/Vazirmatn-Bold.woff2" as="font" type="font/woff2" crossorigin>

```

#### Speed Optimization CSS Importing
```html
<!-- Shabnam Font CSS Importing -->
<link rel="preload"
     href="/assets/css/fonts/Shabnam.css?v=2.0.1"
     as="style"
     onload="this.onload=null;this.rel='stylesheet'">
<noscript>
   <link rel="stylesheet" href="/assets/css/fonts/Shabnam.css?v=2.0.1">
</noscript>

<!-- Other - Farsi & English Fonts -->
<link rel="preload"
   href="assets/css/fonts/fonts.css?v=2.0.1"
   as="style"
   onload="this.onload=null;this.rel='stylesheet'">
<noscript>
<link rel="stylesheet" href="assets/css/fonts/fonts.css?v=2.0.1">
</noscript>
```

### Javascript in Pages
1. Page Lists
   2. `index.html`
   3. 
```js
// JS for EmailJS Service
<script type="text/javascript"
src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js">
</script>

```