const jwt = require('jsonwebtoken');

//TODO: Add loginName
const generateJWT = (uid, loginName) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            loginName
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
};


module.exports = {
    generateJWT: generateJWT,
};