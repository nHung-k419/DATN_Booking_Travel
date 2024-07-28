import express from 'express'
import Categories_Controller from '../App/Controllers/Categories_Controller.js'
const Router = express.Router()
Router.get('/GetCategories', Categories_Controller.GetAllCategory) // http://localhost:3001/V2/Category/getCategories
Router.post('/CreateCategory', Categories_Controller.CreateCategory) // http://localhost:3001/V2/Category/CreateCategory
Router.post('/UpdateCategory/:id', Categories_Controller.UpdateCategory) // http://localhost:3001/V2/Category/UpdateCategory/66a46a2852a8d1dbe7a70291
Router.post('/DeleteCategory/:id', Categories_Controller.DeleteCategory) // http://localhost:3001/V2/Category/DeleteCategory/66a46a2852a8d1dbe7a70291
Router.get('/', Categories_Controller.GetAllCategory)
export default Router