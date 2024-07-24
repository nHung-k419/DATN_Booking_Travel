import Tour from './Tour.Route.js'
import User from './User.Route.js'
const Route = (app) => {
    app.use('/V1/Tours', Tour)
    app.use('/User',User)
    app.use('/',Tour)
}
export default Route