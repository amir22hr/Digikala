const { rou, invalidationLogout } = require('../../utils')

const get = async (req, res) => {
    await invalidationLogout(req, res)

    return res.status(302).redirect(rou.home)
}

const post = async (req, res) => {
    await invalidationLogout(req, res)

    return res.status(302).redirect(rou.home)
}

module.exports = {
    get,
    post
}