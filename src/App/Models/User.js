class User {
    constructor(_id, Name, Email, Password, Role) {
        this._id = _id
        this.Name = Name
        this.Email = Email
        this.Password = Password
        this.role = Role
    }
    // Register
    static async Check_UserisExist(db, Email) {
        try {
            const result_check = await db.collection('Users').findOne({ Email: Email })
            return result_check 
        } catch (error) {
            console.log('Error', error);
            throw error;
        }
    }
    async Create_User(db) {
        try {
            return await db.collection('Users').insertOne(this);
        } catch (err) {
            console.error(`Error: ${err}`);
            throw err;
        }
    }

    // Login
   static async Find_user(db,Email){
        try {
            return await db.collection('Users').findOne({Email : Email})

        } catch (error) {
            console.log('error',error);
        }
    }

}
export default User