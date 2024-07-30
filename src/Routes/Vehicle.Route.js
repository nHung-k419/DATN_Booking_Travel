import express from 'express'
import Vehicle_Controller from '../App/Controllers/Vehicle_Controller.js'
const Router = express.Router()
Router.get('/GetAllVehicle',Vehicle_Controller.GetAllVehicle)
Router.post('/CreateVehicle',Vehicle_Controller.CreateVehicle)
Router.post('/UpdateVehicle/:id',Vehicle_Controller.UpdateVehicle)
Router.post('/DeleteVehicle/:id',Vehicle_Controller.DeleteVehicle)
Router.get('/',Vehicle_Controller.GetAllVehicle)


export default Router