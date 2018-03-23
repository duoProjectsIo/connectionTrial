exports.emailValidation = function(req, res) {
    let mongoose = require('mongoose'),
        userAdmin = mongoose.model('userAdmin');

    userAdmin.findOne({ email: req.body.signUpEmail })
        .then(function(user) {
            if (user) {
                res.json({
                    status: false,
                    message: 'Esse usuário já existe. Você esqueceu sua senha?'
                })
            } else {
                res.json({ status: true })
            }
        }, function(err) {
            res.json({
                status: false,
                message: 'Houve um erro em nossos servidores'
            })
        })
};