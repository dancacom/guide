// gulp and gulp-deps
const gulp       = require("gulp");
const sass       = require("gulp-sass");
const cleanCSS   = require("gulp-clean-css");
const imagemin   = require("gulp-imagemin");
const livereload = require("gulp-livereload");

// sass to css
gulp.task("sass", () => {
  return gulp.src("./source/style/main.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({compatibility: "ie8"}))
    .pipe(gulp.dest("./dist/style/"));
});

// compress images
gulp.task("images", () => {
  return gulp.src("./source/images/**/*")
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest("./dist/images/"));
});

// watch diffs
gulp.task("watch", () => {
  livereload.listen();
  gulp.watch("./source/style/**/*",  ["sass"]);
  gulp.watch("./source/images/**/*", ["images"]);
});

// server with browserSync
gulp.task("serve", ["sass"], () => {
  browserSync.init({
    server: {
      baseDir: config.mainFile
    }
  });

  gulp.watch("./dist/**/*").on("change", browserSync.reload);
});

// default task
gulp.task("default", [
  "sass", "images", "serve", "watch"
]);
