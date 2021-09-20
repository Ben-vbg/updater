
const {src, dest, watch, series, parallel} = require('gulp');

const connect       = require('gulp-connect');
// const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');
const htmlmin       = require("gulp-htmlmin");
const autoprefixer  = require('autoprefixer')
const postcss       = require('gulp-postcss')
const sass          = require("gulp-dart-sass");


const configs = {
  connect: {
    root: "./app/dist/",
    port: 8287,
    live: true
  },

  html: {
    in: "./app/src/**/*.html",
    out: "./app/dist/",
    watch: "./app/src/**/*.html",
  },

  scss: {
    in: "./app/src/css/*.scss",
    out: "./app/dist/css/",
    watch: "./app/src/css/**/*.scss",
  },

  js: {
    in: "./app/src/js/*.js",
    out: "./app/dist/js/",
    watch: "./app/src/js/**/*.js",
  }

};

//* Create basic development server using connect
async function connect_init() {
  return connect.server({
    root: configs.connect.root,
    port: configs.connect.port,
    livereload: configs.connect.live
  });
}

//* Compile HTML files with HtmlMin
function compil_html() {
  return src(configs.html.in)
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(configs.html.out))
    .pipe(connect.reload());
}

function compil_js() {
  return src(configs.js.in)
    // .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(configs.js.out))
    .pipe(connect.reload());
}

function compil_scss() {
  return src(configs.scss.in)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(configs.scss.out))
    .pipe(connect.reload());
}

// WATCHERS
//* Watch and compile changes of Html files
async function watch_html() {
  return watch([configs.html.watch], series(compil_html));
}

//* Watch and compile changes of SCSS files
async function watch_scss() {
  return watch([configs.scss.watch], series(compil_scss));
}

//* Watch and compile changes of SCSS files
async function watch_js() {
  return watch([configs.js.watch], series(compil_js));
}

exports.compile = series(compil_scss, compil_js);

exports.default = series(
  series(compil_scss, compil_js, compil_html),
  parallel(connect_init, watch_html, watch_scss, watch_js)
);
