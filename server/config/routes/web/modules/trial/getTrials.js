exports.getTrials = function(req, res) {
    let mongoose = require('mongoose'),
        trial = mongoose.model('trial');

    trial.find({}, function(err, trial) {
        if (err) {
            res.json({ status: false });
        } else {
            res.json({
                status: true,
                data : trial
            });
        }
    });
};