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

gulp.task('watch', () => {
  require('gulp-livereload').listen();

  gulp.watch('./source/stylesheets/**/*', ['sass']);
  gulp.watch('./source/views/**/*',       ['views']);
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
  'sass', 'views', 'serve', 'watch'
]);
