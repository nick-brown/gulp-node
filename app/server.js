var liverl = require('connect-livereload')
,   express = require('express')
,   app = express()
,   bodyParser = require('body-parser')
,   db = require('../config/db')
,   lr = require('tiny-lr')();


// CONSTANTS
//==================================================================
var EXPRESS_ROOT = __dirname + '/public'
,   EXPRESS_PORT = process.env.PORT || 8080
,   LIVERELOAD_PORT = 35729


// START SERVERS
//==================================================================
module.exports = function() {

    app.use(bodyParser());
    app.use(express.static(EXPRESS_ROOT));
    app.use(liverl());

    // Set up db models
    var models = {
        Todo: require('./models/todo')
    };

    // Load router routes 
    require('./routes')(express.Router(), app, models)

    // Set default route
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

    // Connect to mongo and start the server
    db.connect();
    lr.listen(LIVERELOAD_PORT);
    app.listen(EXPRESS_PORT);
};
