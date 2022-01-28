const rou = require('../helpers/routes')

// catch 404 and forward to notFound.ejs
const handlePageNotFound = (req, res) => {
    res.render('error/pageNotFound', {
        title: "صفحه پیدا نشد",
        url: req.url,
        rou
    })
}

// handler Server Error and forward to serverError.ejs
const handleServerError = (err, req, res, next) => {
    console.log(err.stack)
    res.render('error/serverError', {
        url: req.url,
        title: "خطایی پیش آمده است",
        rou
    })
}

module.exports = {
    handlePageNotFound,
    handleServerError
}