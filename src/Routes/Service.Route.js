import express from 'express'
import Service_Controller from '../App/Controllers/ServiceTour_Controller.js'
const Router = express.Router()
Router.get('/GetAllService',Service_Controller.GetAllService)
Router.post('/CreateService',Service_Controller.CreateService)
Router.post('/UpdateService/:id',Service_Controller.UpdateService)
Router.post('/DeleteService/:id',Service_Controller.DeleteService)
Router.get('/',Service_Controller.GetAllService)


export default Router