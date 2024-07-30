import Tour from './Tour.Route.js'
import User from './User.Route.js'
import Categories from './Categories.Route.js'
import Service from './Service.Route.js'
import Vehicle from './Vehicle.Route.js'
const Route = (app) => {
    app.use('/V1/Tours', Tour)
    app.use('/V2/Category', Categories)
    app.use('/Services',Service)
    app.use('/Vehicles',Vehicle)
    app.use('/User', User)
    app.use('/', Tour)
}
export default Route