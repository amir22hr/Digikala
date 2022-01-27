require('dotenv').config()

const { configs, verifyUser, errorHandler } = require('./src/app/middlewares')
const routes = require('./src/app/routes/index.routes')

/**
 * -------------- GENERAL SETUP ----------------
 */

// app middleware
const app = configs()

/**
 * -------------- USER AUTHENTICATION ----------------
 */

//Verify User by Jwt
app.use(verifyUser)

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./src/app/routes
app.use(routes)

/**
 * -------------- ERROR HANDLER ----------------
 */

//404 - 500
errorHandler(app)

//------------------
module.exports = app