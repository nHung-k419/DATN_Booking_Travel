import Connection from '../../Config/db/index.js'
import User from '../Models/User.js';
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
import Auth from '../MiddleWare/Jwt/Auth.js';
import jwt from "jsonwebtoken";
import "dotenv/config.js";

class User_Controller {
    Register(req, res, next) {
        const { Name, Email, Password } = req.body
        const role = 'User'
        const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        const isCheckEmail = reg.test(Email)
        if (Name === "" || !isCheckEmail || Password === "") {
            return res
                .status(400)
                .send({ errorMessage: 'Please enter complete infomation' });
        }
        Connection.connect().then(async (db) => {
            try {
                const result_user = await User.Check_UserisExist(db, Email)
                if (result_user) {
                   return res.status(400).send({ error: 'Email is already taken' })
                } else {
                    bcrypt.hash(Password, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                        } else {
                            Connection.connect().then(async (db) => {
                                const user = new User(undefined, Name, Email, hash, role)
                                const result_save = user.Create_User(db)
                                if (result_save) {
                                    console.log('Create new user');
                                    return res.status(200).send({ message: 'Register is successful' })
                                } else {
                                    return res.status(400).send({ message: 'Register is failed' })
                                }
                            })
                        }
                    })
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    Login(req, res, next) {
        const { Email, Password } = req.body
        const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        const isCheckEmail = reg.test(Email)
        if (Email === "" || Password === "" || !isCheckEmail) {
            return res.status(400).send({ message: 'Please enter complete infomation' })
        }
        Connection.connect().then(async (db) => {
            try {
                const find_user = await User.Find_user(db, Email)
                if (!find_user) {
                    return res.status('404').send({ message: 'Email not found' })
                }
                bcrypt.compare(Password, find_user.Password, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result) {
                            const AccessToken = Auth.createAccessToken(find_user.Name, find_user.Email, find_user.role)
                            const RefeshToken = Auth.GeneralRefeshToken(find_user.Name, find_user.Email, find_user.role)
                            if (AccessToken) {
                                res.cookie('AccessToken', AccessToken, {
                                    httpOnly: true,
                                    secure: false, // false if not using https | true if using https
                                    sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                    maxAge: 3600000, // expired time, should set to match token expiry (1h)
                                });
                            }
                            res.status(200).json({ ...find_user, AccessToken, RefeshToken })
                        }
                    }
                })
            } catch (error) {
                console.log('error', error);
            }
        })
    }

    RefeshToken(req, res, next) {
        Connection.connect().then(async (db) => {
            try {
                const RefreshTokens = req.headers.token.split(" ")[1]
                if (RefreshTokens) {
                    jwt.verify(RefreshTokens, process.env.SECRET_KEY_REFESH_TOKEN, (err, user) => {
                        if (err) {
                            return res.status(401).json({ message: "The user is not authentication" })
                        }
                        if (user) {
                            const NewAccessToken = Auth.createAccessToken(user.name, user.email, user.role)
                            return res.status(200).json({ user, NewAccessToken: NewAccessToken })
                        } else {
                            return res.status(401).json({ message: "The user is not authentication" })
                        }
                    })
                } else {
                    return res.json({ message: "The refesh token is not valid" })
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
}
export default new User_Controller()