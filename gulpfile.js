const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');

sass.compiler = require('node-sass');

const myError = function(err) {
    console.log(err.messageFormatted);

    notifier.notify({
        title: 'Error',
        message: err.messageFormatted
    });
}


const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./",
        }
    });

    cb();
}

const css = function() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact' //expanded, nested, compact, compressed
        }).on('error', myError))
        .pipe(autoprefixer({}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

const watch = function() {
    gulp.watch("./scss/**/*.scss", gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./**/*.js").on('change', browserSync.reload);
}


exports.watch = watch;
exports.css = css;
exports.default = gulp.series(css, server, watch);

