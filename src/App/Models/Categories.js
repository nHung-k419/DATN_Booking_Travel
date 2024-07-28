class Categories {
    constructor(_id, Name_Cate) {
        this._id = _id
        this.Name_Cate = Name_Cate
    }
    static async getAll(db) {
        try {
            const result = await db.collection('Categories')
                .find({})
                .toArray()
            return result
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }
    async Create(db) {
        try {
            const CreateCate = db.collection('Categories').insertOne(this)
            return CreateCate
        } catch (error) {
            console.log(error);
            throw (error)
        }
    }
    async Update(db, id) {
        try {
            const Update = db.collection('Categories')
                .updateOne({ _id: id }, {
                    $set: {
                        Name_Cate: this.Name_Cate
                    }
                })
                return Update
        } catch (error) {

        }
    }
    static async Delete(db, id) {
        try {
            const Delete = await db.collection('Categories').deleteOne({ _id: id })
            return Delete
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
export default Categories