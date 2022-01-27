const { rou, lang, myOrder } = require('../../utils')
const { ProductCategory } = require('../../models')

const digiplusPage = async (req, res) => {

    const data = {
        title: lang.digiplus,
        rou,
        user: req.user,
        categories: await ProductCategory.find(),
        categorySelect: { name: "0" },
        myOrders : await myOrder({ customer: req.user })
    }

    res.render("home/digiplusPage", data)
}

module.exports = digiplusPage