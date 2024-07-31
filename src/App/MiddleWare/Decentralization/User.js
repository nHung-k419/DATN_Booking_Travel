
function User(req, res, next) {
    const Object = req.cookies.Role
    if (Object.role === 'User' || Object.role === 'user') {
        // console.log('You are is User');
        next()
    } else {
        // console.log('You not a User, dont permission');
        return res.status(400).json('You are not User ,dont have permission')
    }
}

export default User;