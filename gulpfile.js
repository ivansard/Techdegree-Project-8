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
const browserSync = require('browser-sync').create();

const options = {
    app: 'app',
    dist: 'dist'
}

//This task initializes the js sourcemaps and concatenates the js files
gulp.task('concatScripts', () => {
    return gulp.src(options.app + '/js/circle/*.js')
               .pipe(sourceMaps.init())
               .pipe(concat('global.js'))
               .pipe(sourceMaps.write('../js'))
               .pipe(gulp.dest(options.app + '/js'))
})

//Minifies the js files
gulp.task('scripts', ['concatScripts'], () => {
     return gulp.src(options.app + '/js/global.js')
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(gulp.dest('dist/scripts'))
})


//Initializes css sourcemaps and compiles the sass to css
gulp.task('compileSass', () => {
    return gulp.src(options.app + '/sass/global.scss')
               .pipe(sourceMaps.init())
               .pipe(sass())
               .pipe(rename('global.css'))
               .pipe(sourceMaps.write('../css'))
               .pipe(gulp.dest(options.app + '/css'))
               .pipe(browserSync.reload({
                   stream: true
               }))
})

//Minifies the css files
gulp.task('styles', ['compileSass'], () => {
    return gulp.src(options.app + '/css/global.css')
               .pipe(uglifyCss())
               .pipe(rename('all.min.css'))
               .pipe(gulp.dest('dist/styles'))
})

//Minifies the image files
gulp.task('images', () => {
    return gulp.src([options.app + '/images/*',options.app + '/icons/*'])
               .pipe(imageMin())
               .pipe(gulp.dest('dist/content'))
})

//Watches for changes in scss files
gulp.task('watch', () => {
    gulp.watch('app/sass/**/*.scss', ['styles'])
})

//Deletes the dist folder
gulp.task('clean', () => {
    return del.sync('dist/**', '!../dist');
})

//Generates all the needed content in the dist folder - css, js, images
gulp.task('generateDistContent', ['scripts', 'styles', 'images'], () => {
    return gulp.src('app/index.html')
               .pipe(gulp.dest('dist'));
});

//First executes the clean task, and then the generateDistContent task
gulp.task('build', () => {
    return runSequence('clean'
                , 'generateDistContent', 'watch');
})

//Starts web-server
gulp.task('startServer', () => {
    return browserSync.init({
        server: {
          baseDir: 'app'
        },
      })
})

//Default task, which additionally creates a web-server

gulp.task('default', ['build'], () => {
    gulp.start('startServer');
})