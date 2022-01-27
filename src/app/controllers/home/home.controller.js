const { rou, lang, myOrder } = require('../../utils')
const { ProductCategory } = require('../../models')

const home = async (req, res) => {
    const data = {
        title: lang.home,
        rou,
        user: req.user,
        categories: await ProductCategory.find(),
        categorySelect: { name: "0" },
        myOrders : await myOrder({ customer: req.user })
    }

    res.render("home/home", data)
}

module.exports = home