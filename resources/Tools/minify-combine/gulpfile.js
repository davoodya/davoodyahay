const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// مسیر CSS و JS اصلی
const cssFiles = [
    'css/style.css',
    'css/style-index.css',
    'css/header-footer.css'
];

const jsFiles = [
    'js/main.js',
    'assets/js/4_dist_email.js'
];

// Task برای Combine + Minify CSS
gulp.task('css', function() {
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.css'))   // نام فایل خروجی
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

// Task برای Combine + Minify JS
gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

// Task پیش‌فرض
gulp.task('default', gulp.parallel('css', 'js'));
