exports.getKeywords = function(req, res) {
    let mongoose = require('mongoose'),
        keywords = mongoose.model('keywords');

    keywords.find({}, function(err, keywords) {
        if (err) {
            res.json({ status: false });
        } else {
            res.json({
                status: true,
                data : keywords
            });
        }
    });
};