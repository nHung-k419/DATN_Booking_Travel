import Connection from '../../../Config/db/index.js'
function Check_Decentralization(req, res, next) {
    Connection.connect().then(async (db) => {
        let Acounts_User = await db.collection('Users').find({}).toArray()
        let Email = req.body.Email
        let Accoutn = Acounts_User.find(find => find.Email === Email)
        if (Accoutn.role === 'Admin' || Accoutn.role === 'admin') {
            res.cookie('Role', JSON.stringify(Accoutn))
            console.log('you have permission access');
            setTimeout(() => {
                next()
            })
        } else if (Accoutn.role === 'User' || Accoutn.role === 'user') {
            res.cookie('Role', JSON.stringify(Accoutn))
            console.log('User');
            setTimeout(() => {
                next()
            })
        }
    })
}

export default Check_Decentralization;