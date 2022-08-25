const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");


// Compile sass into CSS & auto-inject into browsers
function styles() {
    return gulp.src("src/scss/*.+(sass|scss)")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
}

// Static Server + watching scss/html files
function server(styles) {

    browserSync.init({
        server: "src"
    });
    	gulp.watch("src/scss/*.+(sass|scss)", styles());
    	gulp.watch("src/*.html").on('change', browserSync.reload);
}


//exports.styles = styles;
exports.default = server;
//gulp.task(gulp.series('default', 'server'));