const RouteNames = require('./names')
const NextRoutes = require('next-routes')

const routes = NextRoutes().add(RouteNames.TEST, '/', '/test')

routes.RouteNames = RouteNames

module.exports = routes
