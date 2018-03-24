let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    objSchema = new mongoose.Schema({
        keywordID: Schema.ObjectId,
        userID: { type: Schema.ObjectId, required: true, ref: 'userAdmin' },
        keywords : { type : String }
    });

module.exports = mongoose.model('keywords', objSchema);