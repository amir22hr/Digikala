const { errorHandler } = require('../utils')

/**
 * Error Handler 404 , 500
 * @param  app 
 */
module.exports = (app) => {
    //err 404
    app.use(errorHandler.handlePageNotFound)
    //err 500
    app.use(errorHandler.handleServerError)
}