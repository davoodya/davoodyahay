const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber'); // جلوگیری از توقف gulp در صورت ارور

// -----------------------------
// 1. مسیر فایل‌ها به ترتیب اهمیت
// -----------------------------

const cssFiles = [
    'css/style.css',          // فایل اول → بالاترین اهمیت
    'css/style-index.css',    // فایل دوم
    'css/header-footer.css'   // فایل سوم
];

const jsFiles = [
    'js/main.js',             // فایل اصلی خودت اول
    'assets/js/4_dist_email.js' // فایل MailJS دوم
];

// -----------------------------
// 2️. Task برای Combine + Minify CSS
// -----------------------------
gulp.task('css', function() {
    return gulp.src(cssFiles, { allowEmpty: true }) // ترتیب آرایه رعایت می‌شود
        .pipe(plumber()) // جلوگیری از توقف در صورت خطا
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.css')) // فایل نهایی
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))  // ایجاد فایل source map
        .pipe(gulp.dest('dist/css')); // مسیر خروجی
});

// -----------------------------
// 3. Task برای Combine + Minify JS
// -----------------------------
gulp.task('js', function() {
    return gulp.src(jsFiles, { allowEmpty: true })
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js')) // ترکیب به ترتیب آرایه
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

// -----------------------------
// ️4. Task پیش‌فرض
// -----------------------------
gulp.task('default', gulp.parallel('css', 'js'));
