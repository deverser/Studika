const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");


//Path to project HTML, Sass, CSS and JS files
const path = {
	sass: "src/scss/**/*.+(sass|scss)",
	css: "src/css",
	html: "src/*.html",
	js_src: "src/js/script.js",
	js_dist: "dist/js/"
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
    return gulp.src(path.sass)
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({cascade: false}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream());
}

//Function for tracing changes in sass/scss files
function trace() {
	gulp.watch(path.sass, gulp.parallel(styles));
}

// function scripts() {
//   return src(path.js_src)
//   .pipe(
//     includeFiles({
//       includePaths: './src/components/**/',
//     })
//   )
//   .pipe(dest(path.js_dist))
//   .pipe(browserSync.stream());
// }

// Static Server + watching scss/html files
function server() {

    browserSync.init({
        server: "src"
    });
    	gulp.watch(path.html).on('change', browserSync.reload);
}


exports.default = gulp.parallel(server, styles ,trace);
exports.trace = trace;
exports.server = server;