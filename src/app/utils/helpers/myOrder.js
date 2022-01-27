const { Cart, Product } = require('../../models')

const myOrder = async ({ customer, status="pending" }) => {

    try {

        if (customer) {
            const myCart = await Cart.findOne({ customer_id: customer._id, status });
            if (myCart) {
                let idsOrder = []
                await myCart.products_id.forEach(item => {
                    idsOrder.push(item.id)
                });
                return await Product.find({ '_id': { $in: idsOrder } })
            }
        }

        //else
        return 0

    } catch (error) {
        console.log(error)
    }

}

module.exports = myOrder