import Connection from '../../Config/db/index.js'
import { ObjectId } from 'mongodb'
import Service from '../Models/Service.js'
class ServiceTour_Controller {
   GetAllService(req, res, next) {
      Connection.connect().then(async (db) => {
         try {
            const GetServices = await Service.GetServices(db)
            if (GetServices) return res.status(200).json({ Services: GetServices })
         } catch (error) {
            console.log(error);
         }
      })
   }
   CreateService(req, res, next) {
      const { Name_Service } = req.body
      console.log(Name_Service);
      Connection.connect().then(async (db) => {
         try {
            const CheckService = await Service.FindService(db, Name_Service)
            if (!CheckService) {
               const Create = new Service(undefined, Name_Service)
               const result = await Create.CreateServices(db)
               if (result) return res.status(200).json({ message: 'Created Success' })
            } else {
               return res.status(400).json({ message: 'Service is already exist' })
            }
         } catch (error) {
            console.log(error);
         }
      })
   }
   UpdateService(req, res, next) {
      const { id } = req.params
      const { Name_Service } = req.body
      Connection.connect().then(async (db) => {
         try {
            const Update = new Service(undefined, Name_Service)
            const result = await Update.UpdateService(db, new ObjectId(id))
            if (result) return res.status(200).json({ message: 'Updated Success' })
         } catch (error) {
            console.log(error);
         }
      })
   }
   DeleteService(req, res, next) {
      const { id } = req.params
      Connection.connect().then(async (db) => {
         try {
            const Delete = Service.DeleteService(db, new ObjectId(id))
            if (Delete) return res.status(200).json({ message: 'Deleted Success' })
         } catch (error) {
            console.log(error);
         }
      })
   }
}
export default new ServiceTour_Controller()