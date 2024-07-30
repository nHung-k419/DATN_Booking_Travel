import Connection from '../../Config/db/index.js'
import Vehicle from '../Models/Vehicle.js';
import { ObjectId } from 'mongodb';
class Vehicle_Controller {
    GetAllVehicle(req, res, next) {
        Connection.connect().then(async (db) => {
            try {
                const GetVehicle = await Vehicle.GetVehicle(db)
                if (GetVehicle) return res.status(200).json({ Vehicle: GetVehicle })
            } catch (error) {
                console.log(error);
            }
        })
    }
    CreateVehicle(req, res, next) {
        const { Name_Vehicle } = req.body
        Connection.connect().then(async (db) => {
            try {
                const CheckVehicle = await Vehicle.FindVehicle(db, Name_Vehicle)
                if (!CheckVehicle) {
                    const Create = new Vehicle(undefined, Name_Vehicle)
                    const result = await Create.CreateVehicle(db)
                    if (result) return res.status(200).json({ message: 'Created Success' })
                } else {
                    return res.status(400).json({ message: 'Vehicle is already exist' })
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
    UpdateVehicle(req, res, next) {
        const { id } = req.params
        const { Name_Vehicle } = req.body
        Connection.connect().then(async (db) => {
            try {
                const Update = new Vehicle(undefined, Name_Vehicle)
                const result = await Update.UpdateVehicle(db, new ObjectId(id))
                if (result) return res.status(200).json({ message: 'Updated Success' })
            } catch (error) {
                console.log(error);
            }
        })
    }
    DeleteVehicle(req, res, next) {
        const { id } = req.params
        Connection.connect().then(async (db) => {
            try {
                const Delete = Vehicle.DeleteVehicle(db, new ObjectId(id))
                if (Delete) return res.status(200).json({ message: 'Deleted Success' })
            } catch (error) {
                console.log(error);
            }
        })
    }
}
export default new Vehicle_Controller()