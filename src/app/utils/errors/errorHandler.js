// catch 404 and forward to notFound.ejs
const handlePageNotFound = (req, res) => {
    res.status(404).end("404")
}

// handler Server Error and forward to serverError.ejs
const handleServerError = (err, req, res, next) => {
    console.log(err.stack)
    res.status(500).end("500")
}

module.exports = {
    handlePageNotFound,
    handleServerError
}