var lr = require('tiny-lr')();

var EXPRESS_ROOT = __dirname + '/public';

module.exports = function(event) {
 
    // gulp.watch() events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);

    lr.changed({
        body: {
            files: [fileName]
        }
    });

};
