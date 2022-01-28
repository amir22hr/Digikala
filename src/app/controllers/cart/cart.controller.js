const ejs = require('ejs')

const { rou, lang, myOrder, mailSender } = require('../../utils')
const { ProductCategory, Customer, Cart } = require('../../models')

const get = async (req, res) => {

    try {
        const deleteItem = req.query.deleteItem
        if (deleteItem) {
            try {
                const myCart = await Cart.findOne({ customer_id: req.user._id })
                if (myCart) {
                    if (myCart.products_id.length == 1) {
                        await Cart.findOneAndDelete({ customer_id: req.user._id })
                    } else {
                        for (let i = 0; i < myCart.products_id.length; i++) {
                            if (myCart.products_id[i].id === deleteItem) {
                                const myCartBefore = myCart.products_id.slice(0, i)
                                const myCartAfter = myCart.products_id.slice(i + 1, myCart.products_id.length)
                                myCart.products_id = []
                                console.log(myCartBefore)
                                console.log(myCartAfter)
                                if (myCartBefore.length) myCartBefore.map(obj => myCart.products_id.push(obj))
                                if (myCartAfter.length) myCartAfter.map(obj => myCart.products_id.push(obj))

                                myCart.save()
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }

            //
            return res.status(302).redirect(rou.cart)
        }

        // let setFlash = req.flash('dashboard_chargeWallet')
        // if (setFlash.length === 0) setFlash = null
        const myOrders = await myOrder({ customer: req.user })
        if (myOrders) {
            //Final Amount
            var Amount = {
                allPrice: 0,
                subscriptionDiscount: 0,
                transportationCosts: 20000, //default
                points: 0,
                finalAmount: 0
            }
            myOrders.forEach(order => {
                Amount.allPrice += order.items.price.original
                Amount.subscriptionDiscount += order.items.price.subscription_discount ? order.items.price.subscription_discount : 0,
                    Amount.points += order.items.points
            });
            Amount.finalAmount = (Amount.allPrice - Amount.subscriptionDiscount) + Amount.transportationCosts
        }

        var myCartNumber = [];
        const myCart = await Cart.findOne({ customer_id: req.user._id, status: "pending" })
        if (myCart) {
            myOrders.forEach((element, index) => {
                myCartNumber.push(myCart.products_id[index].number)
            });
        }

        const data = {
            title: `${lang.cart} - ${req.user.name}`,
            user: req.user,
            rou,
            lang,
            categories: await ProductCategory.find(),
            categorySelect: { name: "0" },
            myOrders,
            Amount,
            myCartNumber
        }

        res.render('cart/cart', data)
    } catch (error) {
        console.log(error)
        return res.status(302).redirect(rou.home)
    }

}

const post = async (req, res) => {

    try {

        const myOrders = await myOrder({ customer: req.user })
        if (myOrders) {

            //Final Amount
            var Amount = {
                allPrice: 0,
                subscriptionDiscount: 0,
                transportationCosts: 20000, //default
                points: 0,
                finalAmount: 0
            }
            myOrders.forEach(order => {
                Amount.allPrice += order.items.price.original
                Amount.subscriptionDiscount += order.items.price.subscription_discount ? order.items.price.subscription_discount : 0,
                    Amount.points += order.items.points
            });
            Amount.finalAmount = (Amount.allPrice - Amount.subscriptionDiscount) + Amount.transportationCosts


            //count product
            var myCartNumber = [];
            const myCart = await Cart.findOne({ customer_id: req.user._id, status: "pending" })
            myOrders.forEach((element, index) => {
                myCartNumber.push(myCart.products_id[index].number)
            });

            //for
            const client = `دیجی کالا - لیست سفارش ${req.user.name}`

            //render ejs
            const data = {
                user: req.user,
                myOrders,
                myCartNumber,
                Amount,
                client
            }
            const html = await ejs.renderFile(`${__dirname}/../../views/mail/cartMail.ejs`, data)

            //send Mail with html
            await mailSender({
                to: req.user.email,
                subject: client,
                html
            });

            //Complete Cart
            myCart.status = "success";
            await myCart.save()

            const customer = await Customer.findById(req.user._id)
            customer.items.points += Amount.points
            await customer.save()


        }

    } catch (error) {
        console.log(error);
    }

    return res.status(302).redirect(rou.cart)

}

module.exports = {
    get,
    post
}