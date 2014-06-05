var mongoose = require('mongoose');

module.exports = {
    url: 'mongodb://localhost/todo',

    connect: function() {
        mongoose.connection.on('error', function () {
            console.log("Connection error");
        });

        mongoose.connection.on('open', function () {
            console.log("Mongo connection successful");
        });

        mongoose.connect(this.url);
    }
}
