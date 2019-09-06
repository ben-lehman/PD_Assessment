// gulpfile.js
const gulp = require('gulp');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function(done) {
  del.sync(['dist']);
  done();
})

gulp.task('index', function() {
  return gulp.src('src/index.html')
          .pipe(gulp.dest('./dist/'))
})

gulp.task('css', function() {
  return gulp.src('src/assets/sass/input.scss')
          .pipe(sass())
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(autoprefixer())
          .pipe(gulp.dest('./dist/css/'));
})

gulp.task('jsMinify', function() {
  return gulp.src('src/assets/scripts/*js')
        .pipe(terser())
        .pipe(gulp.dest('dist/js/'))
})

gulp.task('watch', function() {
  gulp.watch('src/assets/sass/*.scss', gulp.series('css'));
  gulp.watch('src/index.html', gulp.series('index'));
  gulp.watch('src/assets/scripts/*js', gulp.series('jsMinify'));
});

gulp.task('build', gulp.series('clean', 'css', 'jsMinify', 'index'));
