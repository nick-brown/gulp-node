var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    completed: { type: Boolean, default: false },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Todo', TodoSchema);
