const { Session } = require('../../models')

//When Click Logout Button
const invalidationLogout = async (req, res) => {
    const customer_id = req.user._id

    try {
        //clear session in DB
        await Session.findOneAndDelete({ customer_id });

        //clear cookie in browser
        // await res.status(200).clearCookie('user_cookie', {
        //     path: '/'
        // });
        await req.session.destroy();

        await res.cookie('user_cookie', "", { expires: new Date(0), domain: '', path: '/' });

    } catch (error) {
        console.log(error)
    }
}

/**
 * When Click Login Button
 * @param {string} customer_id 
 */
const invalidationLogin = async (customer_id) => {
    try {
        await Session.findOneAndDelete({ customer_id })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    invalidationLogout,
    invalidationLogin
}