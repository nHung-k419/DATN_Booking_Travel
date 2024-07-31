
function Admin(req, res, next) {
    const Object = req.cookies.Role
    if (Object.role === 'Admin' || Object.role === 'admin') {
        // console.log('You are Admin');
        next()
    } else {
        // console.log('You are not Admin, dont permission');
        return res.status(400).json('You are not Admin ,dont have permission')
    }

}

export default Admin;