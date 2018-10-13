const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglifyCss = require('gulp-uglifycss');
const sourceMaps = require('gulp-sourcemaps');

gulp.task('concatScripts', () => {
    return gulp.src(['js/*.js', 'js/circle/*.js'])
               .pipe(sourceMaps.init())
               .pipe(concat('all.js'))
               .pipe(sourceMaps.write('../dist/scripts'))
               .pipe(gulp.dest('js'))
})

gulp.task('scripts', ['concatScripts'], () => {
     return gulp.src('js/all.js')
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(gulp.dest('dist/scripts'))
})

gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
               .pipe(sourceMaps.init())
               .pipe(sass())
               .pipe(rename('all.css'))
               .pipe(sourceMaps.write('../dist/styles'))
               .pipe(gulp.dest('css'))
})

gulp.task('styles', ['compileSass'], () => {
    return gulp.src('css/all.css')
               .pipe(uglifyCss())
               .pipe(rename('all.min.css'))
               .pipe(gulp.dest('dist/styles'))
})

