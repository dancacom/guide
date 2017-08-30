const gulp = require('gulp');

gulp.task('sass', () => {
  const sass = require('gulp-sass');

  return gulp.src('./source/stylesheets/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/stylesheets'));
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

  gulp.watch('./source/stylesheets/**/*', ['sass']);
  gulp.watch('./source/views/**/*',       ['views']);
  gulp.watch('./source/images/**/*',      ['images']);
  gulp.watch('./source/javascripts/**/*', ['scripts']);
});

gulp.task('serve', ['sass'], () => {
  const browserSync = require('browser-sync').create();

  browserSync.init({
    port: 8000,
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('./dist/**/*').on('change', browserSync.reload);
});

gulp.task('default', [
  'sass', 'views', 'images', 'scripts', 'serve', 'watch'
]);
