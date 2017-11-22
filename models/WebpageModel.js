var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var webpagesSchema = new Schema({
    'detail': { type: String, required: false },
    'url': { type: String, required: true },
    'status': {},
    'tags': [],
    'createdOn': { type: Date, default: Date.now },
    'updatedOn': { type: Date, default: Date.now }    
});
module.exports = mongoose.model('webpage', webpagesSchema);
