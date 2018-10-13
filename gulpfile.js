const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglifyCss = require('gulp-uglifycss');
const sourceMaps = require('gulp-sourcemaps');
const imageMin = require('gulp-imagemin');
const del = require('del');
const runSequence = require('run-sequence');
const webserver = require('gulp-webserver');

//This task initializes the js sourcemaps and concatenates the js files
gulp.task('concatScripts', () => {
    return gulp.src('js/circle/*.js')
               .pipe(sourceMaps.init())
               .pipe(concat('global.js'))
               .pipe(sourceMaps.write('../dist/scripts'))
               .pipe(gulp.dest('js'))
})

//Minifies the js files
gulp.task('scripts', ['concatScripts'], () => {
     return gulp.src('js/global.js')
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(gulp.dest('dist/scripts'))
})

//Initializes css sourcemaps and compiles the sass to css
gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
               .pipe(sourceMaps.init())
               .pipe(sass())
               .pipe(rename('global.css'))
               .pipe(sourceMaps.write('../dist/styles'))
               .pipe(gulp.dest('css'))
})

//Minifies the css files
gulp.task('styles', ['compileSass'], () => {
    return gulp.src('css/global.css')
               .pipe(uglifyCss())
               .pipe(rename('all.min.css'))
               .pipe(gulp.dest('dist/styles'))
})

//Minifies the image files
gulp.task('images', () => {
    return gulp.src(['images/*', 'icons/*'])
               .pipe(imageMin())
               .pipe(gulp.dest('dist/content'))
})

//Deletes the dist folder
gulp.task('clean', () => {
    return del('dist/**')
})

//Generates all the needed content in the dist folder - css, js, images
gulp.task('generateDistContent', ['scripts', 'styles', 'images'], () => {
    return gulp.src(['index.html', 'icons/**'], {base: './'})
               .pipe(gulp.dest('dist'));
});

//First executes the clean task, and then the generateDistContent task
gulp.task('build', () => {
    return runSequence('clean'
                , 'generateDistContent');
})

gulp.task('startServer', () => {
    return gulp.src('../dist')
        .pipe(webserver({
            livereload: true,
            host: 'localhost',
            port: 3000,
            open: true,
            fallback: 'index.html'
        }))
})

//Default task, which additionally creates a web-server

gulp.task('default', ['build'], () => {
    gulp.start('startServer');
})