const crypto = require('crypto');
const ejs = require('ejs')

const { rou, lang, validation, mailSender } = require('../../utils')
const { Queues } = require('../../models')

const get = (req, res) => {

    if (!req.query.email) {
        return res.status(302).redirect(rou.loginRegister)
    }

    const data = {
        title: lang.register,
        email: req.query.email,
        rou,
    }

    res.render('authentication/register', data)
}

const post = async (req, res) => {

    //Validation Input
    const { error } = validation.registerValidation(req.body);
    if (error) {
        req.flash('loginRegister', {
            status: "is-warning",
            msg: error.message
        })
        return res.status(302).redirect(rou.loginRegister);
    }

    const email = req.body.email;
    const queues = await Queues.findOne({ email })
    const cryptoToken = crypto.randomBytes(80).toString('hex');
    var validLink;
    if (queues) {
        validLink = `http://localhost:3001${rou.registerForm}?token=${queues.token}`
    } else {
        validLink = `http://localhost:3001${rou.registerForm}?token=${cryptoToken}`
    }

    //render ejs
    const data = {
        title: lang.registerMailTitle,
        validLink
    }
    const html = await ejs.renderFile(`${__dirname}/../../views/mail/registerMail.ejs`, data)

    //Validation DB
    if (queues) {
        //EmailSender
        await mailSender({
            to: email,
            subject: lang.registerMailSubject,
            html
        });
    } else {
        const createQueue = Queues({
            email,
            token: cryptoToken,
        });

        try {
            await createQueue.save();
            await mailSender({
                to: email,
                subject: lang.registerMailSubject,
                html
            });
        } catch (err) {
            console.log(err)
        }
    }

    //Redirect to register
    return res.status(302).redirect(`${rou.register}?email=${email}`);

}

module.exports = {
    get,
    post
}