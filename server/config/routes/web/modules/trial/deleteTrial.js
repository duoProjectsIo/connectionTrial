exports.deleteTrial = function(req, res) {
    let mongoose = require('mongoose'),
        trial = mongoose.model('trial');

    trial.remove({
        _id : mongoose.Types.ObjectId(req.body._id)
    }, function(err, trial) {
        if (err) {
            res.json({ status: false });
        } else if (trial.length === 0) {
            res.json({ status: false });
        } else {
            res.json({
                status: true,
                data : trial
            });
        }
    });
};