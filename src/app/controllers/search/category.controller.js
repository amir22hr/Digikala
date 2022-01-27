const { rou, lang, myOrder } = require('../../utils')
const { ProductCategory, Product, Cart } = require('../../models')

const get = async (req, res) => {

    // let setFlash = req.flash('dashboard_chargeWallet')
    // if (setFlash.length === 0) setFlash = null
    const categorySelect = await ProductCategory.findOne({
        "name.english": req.params.category
    });

    const products = await Product.find({
        category_id: categorySelect._id
    }).limit(12)

    const data = {
        title: lang.category,
        user: req.user,
        rou,
        lang,
        categories: await ProductCategory.find(),
        categorySelect,
        products,
        myOrders: await myOrder({ customer: req.user })
    }

    res.render('search/search', data)

}

const post = async (req, res) => {
    return await res.status(302).redirect(rou.home)
}

module.exports = {
    get,
    post
}