const { rou, lang, faErrors, validation } = require('../../utils')
const { Customer, Comment, Product } = require('../../models')

const get = async (req, res) => {

    let setFlash = req.flash('dashboard_myComment')
    if (setFlash.length === 0) setFlash = null

    //find all comment for this user
    const comments = await Comment.find({ customer_id: req.user._id });

    for (let i = 0; i < comments.length; i++) {
        let name = await Product.findById(comments[i].product_id)
        comments[i].product_name = name.name.persian
    }

    const data = {
        title: lang.dashboard_myComment,
        user: req.user,
        flash: setFlash,
        rou,
        comments,
        lang
    }

    res.render('dashboard/myComment', data)

}

const post = async (req, res) => {

    try {

        //Check Validation
        const { error } = validation.comments(req.body)
        if (error) {
            req.flash('dashboard_myComment', error.message)
            return res.status(302).redirect(rou.dashboard_myComment);
        };

        //Check Comment is exist and deleted
        await Comment.findById(req.body.id, async (err, data) => {
            if (err) console.log(err);

            if (data.customer_id === req.user._id.toString()) {
                await Comment.findByIdAndDelete(data._id)
            } else {
                req.flash('dashboard_myComment', faErrors['comments.accessDenied'])
            }
        }).clone();

    } catch (error) {
        console.log(error)
    }

    return await res.status(302).redirect(rou.dashboard_myComment)
}

module.exports = {
    get,
    post
}