var gulp = require('gulp')
,   browserify = require('browserify')
,   source = require('vinyl-source-stream')
,   sass = require('gulp-ruby-sass')
,   jshint = require('gulp-jshint')
,   stylish = require('jshint-stylish')
,   csslint = require('gulp-csslint')
,   livereload = require('./app/livereload')
,   bodyParser = require('body-parser')
,   db = require('./config/db');


// TASKS
//==================================================================
gulp.task("default", function() {
    require('./app/server')();

    gulp.watch("./src/js/**/*.js", ["compile:js"]);
    gulp.watch("./src/scss/**/*.scss", ["compile:css"]);
    gulp.watch("./public/static/**/*.*", livereload);
});

gulp.task("jshint", function() {
    return gulp.src(["./src/js/**/*.js"])
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
});

gulp.task("compile:js", ["jshint"], function() {
    // single point of entry for app
    var bundle = browserify("./src/js/main.js").bundle();
    return bundle
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("./public/static/js/"));
});

gulp.task("compile:css", function() {
    return gulp.src(["./src/scss/*.scss"])
      .pipe(sass())
      .pipe(csslint())
      .pipe(csslint.reporter())
      .pipe(gulp.dest("./public/static/css/"));
});
