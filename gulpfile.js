const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglifyCss = require('gulp-uglifycss');
const sourceMaps = require('gulp-sourcemaps');
const imageMin = require('gulp-imagemin');
const del = require('del');

//This task initializes the js sourcemaps and concatenates the js files
gulp.task('concatScripts', () => {
    return gulp.src(['js/*.js', 'js/circle/*.js'])
               .pipe(sourceMaps.init())
               .pipe(concat('all.js'))
               .pipe(sourceMaps.write('../dist/scripts'))
               .pipe(gulp.dest('js'))
})

//Minifies the js files
gulp.task('scripts', ['concatScripts'], () => {
     return gulp.src('js/all.js')
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(gulp.dest('dist/scripts'))
})

//Initializes css sourcemaps and compiles the sass to css
gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
               .pipe(sourceMaps.init())
               .pipe(sass())
               .pipe(rename('all.css'))
               .pipe(sourceMaps.write('../dist/styles'))
               .pipe(gulp.dest('css'))
})

//Minifies the css files
gulp.task('styles', ['compileSass'], () => {
    return gulp.src('css/all.css')
               .pipe(uglifyCss())
               .pipe(rename('all.min.css'))
               .pipe(gulp.dest('dist/styles'))
})

//Minifies the image files
gulp.task('minifyImages', () => {
    return gulp.src('images/*')
               .pipe(imageMin())
               .pipe(gulp.dest('dist/content'))
})

//Deletes the dist folder
gulp.task('clean', () => {
    del('dist/**')
})





