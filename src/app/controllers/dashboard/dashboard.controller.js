const { rou, lang } = require('../../utils')
const { Comment } = require('../../models')

const get = async (req, res) => {

    const data = {
        title: `پنل - ${req.user.name}`,
        // setFlash: setFlash || null,
        user: req.user,
        rou,
        lang,
        commentLength: await Comment.count({customer_id: req.user._id})
    }

    res.render('dashboard/main', data)

}

const post = async (req, res) => {

}

module.exports = {
    get,
    post
}