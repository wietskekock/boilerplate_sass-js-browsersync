var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var cssSources,
    jsSources;

cssSources = ['sass/*.scss']
jsSources = [
    'js/vendor/jquery-3.2.1.min.js',
    'vendor/gsap/TimelineMax.min.js',
    'js/vendor/scrollmagic/uncompressed/ScrollMagic.js',
    'js/vendor/scrollmagic/uncompressed/plugins/debug.addIndicators.js',
    'js/main.js'
];


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "../",
        //directory: true
    });

    gulp.watch("gulp/sass/*.scss", ['sass']);
    gulp.watch("gulp/js/*.js", ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// concat js files
gulp.task('scripts', function() {
    return gulp.src(jsSources)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('../js/'))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(cssSources)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest("../css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['scripts', 'serve']);