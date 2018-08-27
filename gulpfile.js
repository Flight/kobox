/* global __dirname */

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var PROJECT_ROOT = __dirname;
var PROJECT_SOURCE = {
    'html': PROJECT_ROOT + '/',
    'scss': PROJECT_ROOT + '/private/scss/',
    'assets': PROJECT_ROOT + '/assets/',
    'js': PROJECT_ROOT + '/private/js/'
};
var DESTINATION_PATH = {
    'html': PROJECT_ROOT + '/dist/',
    'css': PROJECT_ROOT + '/dist/css/',
    'assets': PROJECT_ROOT + '/dist/assets/',
    'js': PROJECT_ROOT + '/dist/js/'
};
var PROJECT_PATTERNS = {
    'html': [
        PROJECT_SOURCE.html + '*.html',
    ],
    'scss': [
        PROJECT_SOURCE.scss + '**/*.scss',
        '!' + PROJECT_SOURCE.scss + '**/*.min.scss',
        '!' + PROJECT_SOURCE.scss + 'libs/*.scss'
    ],
    'assets': [
        PROJECT_SOURCE.assets + '**/*.*',
    ],
    'js': [
        PROJECT_SOURCE.js + '**/*.js',
        '!' + PROJECT_SOURCE.js + '**/*.min.js',
        '!node_modules/**',
        PROJECT_SOURCE + '/gulpfile.js'
    ]
};

gulp.task('webserver', function() {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: {
                enable: true,
                path: './dist'
            },
            open: true
        }));
});

gulp.task('html', function () {
    return gulp.src(PROJECT_PATTERNS.html)
        .pipe(gulp.dest(DESTINATION_PATH.html));
});

gulp.task('html:watch', function () {
    gulp.watch(PROJECT_PATTERNS.html, ['html']);
});

gulp.task('scss', function () {
    return gulp.src(PROJECT_PATTERNS.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(DESTINATION_PATH.css));
});

gulp.task('scss:watch', function () {
    gulp.watch(PROJECT_PATTERNS.scss, ['scss']);
});

gulp.task('assets', function () {
    return gulp.src(PROJECT_PATTERNS.assets)
        .pipe(gulp.dest(DESTINATION_PATH.assets));
});

gulp.task('assets:watch', function () {
    gulp.watch(PROJECT_PATTERNS.assets, ['assets']);
});

gulp.task('js', function () {
    return gulp.src(PROJECT_PATTERNS.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(gulp.dest(DESTINATION_PATH.js));
});

gulp.task('js:watch', function () {
    gulp.watch(PROJECT_PATTERNS.js, ['js']);
});

gulp.task('watch', ['html:watch', 'scss:watch', 'assets:watch', 'js:watch']);

gulp.task('default', ['html', 'scss', 'assets','js']);