//tools
const { spinner } = require('./tools/spinner')
const { openDefaultUrl } = require('./tools/openDefaultUrl')
//errors
const { generalError } = require('./errors/generalError')
const errorHandler = require('./errors/errorHandler')
//authentication
const { faErrors } = require('./authentication/joiCustomErrors')
const validation = require('./authentication/validation')
const { invalidationLogout, invalidationLogin } = require('./authentication/Invalidation')
const setCookie = require('./authentication/setCookie')
//helpers
const lang = require('./helpers/lang')
const rou = require('./helpers/routes')
const expiryDigiplus = require('./helpers/expiryDigiplus')
const myOrder = require('./helpers/myOrder')
//mail
const mailGun = require('./mail/mailGun')

module.exports = {
    spinner,
    openDefaultUrl,
    generalError,
    errorHandler,
    faErrors,
    validation,
    lang,
    rou,
    mailGun,
    invalidationLogout,
    invalidationLogin,
    setCookie,
    expiryDigiplus,
    myOrder
}