class Vehicle {
    constructor(_id, NameVehicle) {
        this._id = _id
        this.NameVehicle = NameVehicle
    }
    static async GetVehicle(db) {
        try {
            const result_Vehicle = await db.collection('Vehicles')
                .find({})
                .toArray()
            return result_Vehicle
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    static async FindVehicle(db, NameVehicle) {
        try {
            const resultCheck = await db.collection('Vehicle').findOne({ NameVehicle: NameVehicle })
            return resultCheck ? true : false
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async CreateVehicle(db) {
        try {
            const result_Create = await db.collection('Vehicles')
                .insertOne(this)
            return result_Create
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async UpdateVehicle(db, id) {
        try {
            const result_Update = await db.collection('Vehicles').updateOne(
                { _id: id },
                {
                    $set: {
                        NameVehicle: this.NameVehicle
                    }
                }
            )
            return result_Update
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    static async DeleteVehicle(db, id) {
        try {
            const reuslt_Delete = await db.collection('Vehicles')
                .deleteOne({ _id: id })
            return reuslt_Delete
        } catch (error) {
            console.log(error);
            throw error
        }
    }

}
export default Vehicle