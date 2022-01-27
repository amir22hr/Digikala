const { rou, lang, myOrder, validation } = require('../../utils')
const { ProductCategory, Product, Comment, Cart, Customer } = require('../../models')

const get = async (req, res) => {

    // let setFlash = req.flash('dashboard_chargeWallet')
    // if (setFlash.length === 0) setFlash = null
    try {
        const product = await Product.findById(req.params.id)

        var myCartNumber = null;
        if (req.user) {
            const existCart = await Cart.findOne({ customer_id: req.user._id, status: "pending", "products_id.id": req.params.id });
            if (existCart) {
                existCart.products_id.forEach(product => {
                    if (product.id == req.params.id) {
                        myCartNumber = product.number;
                    }
                });
            }
        }

        const getComment = await Comment.find({
            product_id: req.params.id
        }).sort({ creation_at: -1 })

        for (let i = 0; i < getComment.length; i++) {
            let name = await Customer.findById(getComment[i].customer_id)
            getComment[i].customer_id = name.name
        }


        const data = {
            title: product.name.persian,
            user: req.user,
            rou,
            lang,
            categories: await ProductCategory.find(),
            categorySelect: { name: "0" },
            product,
            myCartNumber,
            myOrders: await myOrder({ customer: req.user }),
            commentLength: getComment.length,
            getComment,
        }

        res.render('product/product', data)

    } catch (error) {
        console.log(error)
        return res.status(302).redirect(rou.home);
    }

}

const post = async (req, res) => {

    const product_id = req.body.product
    const comment = req.body.comment

    //Check Validation
    const { error } = validation.product(req.body)
    if (error) {
        req.flash('product', error.message)
        return res.status(302).redirect(rou.product + product_id);
    };

    if (req.user) {
        if (comment) {
            await Comment.create({
                customer_id: req.user._id,
                product_id,
                content: comment
            })
        }
        else if (product_id) {
            //check customer_id is exist
            const myCart = await Cart.findOne({ customer_id: req.user._id, status: 'pending' })

            // update
            if (myCart) {
                //if product exist => update number
                for (let i = 0; i < myCart.products_id.length; i++) {
                    if (myCart.products_id[i].id == product_id) {
                        const currentNumber = await Number(myCart.products_id[i].number)
                        myCart.products_id[i] = { number: currentNumber + 1, id: product_id }
                        await myCart.save()
                        return res.status(302).redirect(rou.product + product_id);
                    }
                }

                //else => push product
                await myCart.products_id.push({ number: 1, id: product_id })
                await myCart.save()

            }
            //create
            else {
                await Cart.create({
                    customer_id: req.user._id,
                    products_id: { number: 1, id: product_id }
                })
            }
        }

    } else {
        return res.status(302).redirect(rou.loginRegister);
    }

    return res.status(302).redirect(rou.product + product_id);

}

module.exports = {
    get,
    post
}