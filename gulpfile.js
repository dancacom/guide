const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('styles', () => {
  const sass = require('gulp-sass');
  const cleanCSS = require('gulp-clean-css');
  const autoprefixer = require('gulp-autoprefixer');

  return gulp.src('./source/stylesheets/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('minify-styles', () => {
  const cleanCSS = require('gulp-clean-css');

  return gulp.src('./dist/stylesheets/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('style-helpers', () => {
  const paths = ['functions', 'variables'];
  const base  = './source/stylesheets/';
  const dist  = './dist/stylesheets';

  return paths.forEach((path) => {
    let src = base + path + '/**/*';
    gulp.src(src, { base: base }).pipe(gulp.dest(dist));
  });
});

gulp.task('views', () => {
  return gulp.src('./source/views/**/*').pipe(gulp.dest('./dist/views'));
});

gulp.task('images', () => {
  const imagemin = require('gulp-imagemin');

  return gulp.src('./source/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
});

gulp.task('scripts', () => {
  return gulp.src('./source/javascripts/**/*').pipe(gulp.dest('./dist/javascripts'));
});

gulp.task('watch', () => {
  require('gulp-livereload').listen();

  gulp.watch('./source/stylesheets/**/*', ['styles']);
  gulp.watch('./source/views/**/*',       ['views']);
  gulp.watch('./source/images/**/*',      ['images']);
  gulp.watch('./source/javascripts/**/*', ['scripts']);
});

gulp.task('serve', ['styles'], () => {
  const browserSync = require('browser-sync').create();

  browserSync.init({
    port: 8000,
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('./dist/**/*').on('change', browserSync.reload);
});

gulp.task('default', () => {
  runSequence('styles', 'views', 'images', 'scripts', 'serve', 'watch');
});

gulp.task('build', () => {
  runSequence('styles', 'views', 'images', 'scripts', 'minify-styles', 'style-helpers');
});
