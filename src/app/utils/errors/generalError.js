module.exports.generalError = (message, status = 500) => {
    let err = new Error(message);
    err.status = status;
    throw err;
}