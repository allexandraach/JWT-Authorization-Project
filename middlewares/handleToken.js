
const jwt = require('jsonwebtoken');
const secretKey = '4fe324f66481ef1f4a57a3cb98a3ca0528e63e8afd0161120397ca93a9b495d6';
// 1 week
const token_exp_seconds = 7 * 24 * 60 * 60;

const handleToken = (req, res, next) => {

    const userToken = req.header('Authorization');

    if (userToken) {
        // validate token if user has one
        jwt.verify(userToken, secretKey, (err, decoded) => {

            if (decoded) {
                next();

            } else if (err) {
                // log error for debugging
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });

            } else {
                return res.status(401).json({ error: 'Invalid token' });
            }

        })

    } else {
        // create new token
        const payload = {

            userId: req.user._id.toString(),
            username: req.user.username,
            // token will expire in 1 week
            exp: Math.floor(Date.now() / 1000) + token_exp_seconds

        };

        const newToken = jwt.sign(payload, secretKey);
        // console.log(newToken);

        // send new token to client
        res.setHeader('Authorization', 'Bearer ' + newToken);
        next();

    }

}

module.exports = handleToken; 