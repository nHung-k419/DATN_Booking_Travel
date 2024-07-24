import jwt from "jsonwebtoken";
import "dotenv/config.js"; // import dotenv to use process.env
import Connection from '../../../Config/db/index.js'

class Auth {
    static createAccessToken(name, email, role) {
        const Payload = {
            name: name,
            email: email,
            role: role
        };
        // console.log('Payload', Payload);

        const options = {
            expiresIn: '50s',
            algorithm: 'HS256'
        };

        const AccessToken = jwt.sign(Payload, process.env.SECRET_KEY_ACCESS_TOKEN, options);

        return AccessToken;
    }
    static GeneralRefeshToken(name, email, role) {
        const Payload = {
            name: name,
            email: email,
            role: role
        }

        const RefeshToken = jwt.sign(Payload, process.env.SECRET_KEY_REFESH_TOKEN, { expiresIn: '1d' })

        return RefeshToken
    }

    // verify token
    static verifyJWTToken = (req, res, next) => {
        // get token from http header Authorization
        let token = null;
        const authHeader = req.headers.token
        console.log(`AuthHeader: ${authHeader}`);
        if (authHeader != null) {
            token = authHeader.split(' ')[1];
            console.log(`Token from Header: ${token}`);
        } else {
            // get token from http cookie
            token = req.cookies.token;
            // console.log(`Token from Cookie: ${token}`)
        }
        if (token == null) return res.status(401).json({ message: 'Unauthorized' });

        jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(403).json({ message: 'Invalid token' });
            } else {
                // console.log(`Decoded: ${decoded}`);
                req.email = decoded.email;
                // console.log(`Email: ${req.email}`);
                next();
            }
        });
    }
}

export default Auth;