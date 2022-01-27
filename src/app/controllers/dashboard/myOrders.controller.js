const { rou, lang, faErrors, validation, myOrder } = require('../../utils')
const { Product, Comment, Cart } = require('../../models')

const get = async (req, res) => {

    let setFlash = req.flash('dashboard_myComment')
    if (setFlash.length === 0) setFlash = null

    /**
     * whats orders is success
     * return number
     */

    const pendingOrders = await Cart.count({
        customer_id: req.user._id, status: 'pending'
    })

    const findCarts = await Cart.find({
        customer_id: req.user._id, status: 'success'
    });

    //find complete cart
    let all = []
    findCarts.forEach(carts => {
        var array = []
        carts.products_id.forEach(item => {
            array.push(item.id)
        })
        all.push(array)
    })

    //find products in carts
    let myOrders = []
    for (let i = 0; i < all.length; i++) {
        myOrders.push(await Product.find({ '_id': { $in: all[i] } }))
    }

    const data = {
        title: lang.dashboard_myOrders,
        user: req.user,
        flash: setFlash,
        rou,
        lang,
        pendingOrders,
        findCarts,
        myOrders
    }

    res.render('dashboard/myOrders', data)

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