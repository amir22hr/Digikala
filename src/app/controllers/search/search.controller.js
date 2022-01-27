const { rou, lang, myOrder } = require('../../utils')
const { ProductCategory, Product, Cart } = require('../../models')

const get = async (req, res) => {

    // let setFlash = req.flash('dashboard_chargeWallet')
    // if (setFlash.length === 0) setFlash = null
    const products = await Product.find({
        'name.persian': { $regex: req.query.search }
    }).limit(12);

    const data = {
        title: lang.category,
        user: req.user,
        search: req.query.search,
        rou,
        lang,
        categories: await ProductCategory.find(),
        categorySelect: { name: "0" },
        products: products.length !== 0 ? products : null,
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