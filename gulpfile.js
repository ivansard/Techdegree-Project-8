const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('concatScripts', () => {
    return gulp.src(['js/*.js', 'js/circle/*.js'])
               .pipe(concat('all.js'))
               .pipe(gulp.dest('js'))
})

gulp.task('scripts', ['concatScripts'], () => {
     return gulp.src('js/all.js')
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(gulp.dest('dist/scripts'))
})