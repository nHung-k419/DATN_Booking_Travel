import express from 'express'
import Tour_Controller from '../App/Controllers/Tour_Controller.js'
const Router = express.Router()

Router.get('/GetTours', Tour_Controller.GetAllTour)  // Vd :  http://localhost:3001/V1/Tours/GetTours?page=1&limit=1
Router.get('/SearchTour', Tour_Controller.SearchTour) // Vd :  V1/Tours/SearchTour?page=1&limit=2&valueSearch='value'
Router.get('/DetailTour/:id', Tour_Controller.DetailTour) // Vd : V1/Tours/DetailTour/669a3bad03ec7167578570d8
Router.post('/CreateTour', Tour_Controller.Create_Tour)
Router.post('/Update/:id', Tour_Controller.UpdateTour) // Vd : V1/Tours/Update/669a3bad03ec7167578570d8
Router.get('/Delete/:id', Tour_Controller.DeleteTour) // Vd : V1/Tours/Delete/669a3bad03ec7167578570d8
Router.get('/', Tour_Controller.GetAllTour)

export default Router