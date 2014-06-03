var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    sass = require("gulp-ruby-sass"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    csslint = require("gulp-csslint"),
    express = require("express"),
    app = express(),
    lr = require('tiny-lr')();

var EXPRESS_ROOT = __dirname + '/public',
    EXPRESS_PORT = 8080,
    LIVERELOAD_PORT = 35729;

var startExpress = function() {
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);
}
 
var startLivereload = function() {
    lr.listen(LIVERELOAD_PORT);
}
 
var notifyLivereload = function(event) {
 
    // gulp.watch() events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);

    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task("default", function() {
    startExpress();
    startLivereload();

    gulp.watch("./src/js/**/*.js", ["compile:js"]);
    gulp.watch("./src/scss/**/*.scss", ["compile:css"]);
    gulp.watch("./public/static/**/*.*", notifyLivereload);
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

gulp.task("jshint", function() {
    return gulp.src(["./src/js/**/*.js"])
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
});
