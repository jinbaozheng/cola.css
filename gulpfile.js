const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const del = require('del');

sass.compiler = require('node-sass');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这

});

gulp.task('clean', function () {
    del('./dist/*.+(scss|css)')
})

gulp.task('build:css', ['clean'], function () {
    return gulp.src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:dist', ['clean'], function () {
    return gulp.src('./src/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('build:min', ['clean'], function () {
    return gulp.src('./src/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('index.min.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('build:pro', ['build:dist', 'build:min']);