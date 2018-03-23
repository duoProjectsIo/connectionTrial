exports.doLogin = function(req, res) {
    let mongoose = require('mongoose'),
        userModel = mongoose.model('userAdmin'),
        bcrypt = require('bcrypt'),
        jwt = require('jsonwebtoken'),
        token;

    userModel.find({ email: req.body.email }, function(err, user) {
        if (err) {
            res.json({ status: false });
        } else if (user.length === 0) {
            res.json({ status: false });
        } else {
            bcrypt.compare(req.body.password, user[0].password, function(err, isMatch) {
                if (err) {
                    res.json({ status: isMatch });
                } else {
                    token = jwt.sign({
                        id: user[0]._id,
                        email: user[0].email,
                        name: user[0].name,
                        logoPath: user[0].logoPath
                    }, 'connectionTrial', { expiresIn: '12h' });

                    res.json({
                        status: isMatch,
                        token: token
                    });
                }
            });
        }
    });
};