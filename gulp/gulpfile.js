var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

//https://www.browsersync.io/docs/gulp#gulp-sass-css

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "../",
        //directory: true
    });

    gulp.watch("gulp/sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("gulp/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("../"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);