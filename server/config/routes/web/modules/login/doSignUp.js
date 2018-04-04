exports.doSignUp = function(req, res) {
    let mongoose = require('mongoose'),
        userAdmin = mongoose.model('userAdmin'),
        jwt = require('jsonwebtoken'),
        bcrypt = require('bcrypt'),
        salt = bcrypt.genSaltSync(10),
        token;

    new userAdmin({
        email: req.body.signUpEmail,
        password: bcrypt.hashSync(req.body.signUpPassword, salt),
        name: req.body.name
    }).save().then(function(user) {
        token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name
        }, 'connectionTrial', { expiresIn: '12h' });

        res.json({
            status: true,
            token: token
        });

    }, function(err) {
        res.json({
            status: false,
            message: 'Houve um erro ao cadastrar este e-mail e senha. Tem certeza que você já não é nosso cliente? :)'
        });
    });
};