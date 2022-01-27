const crypto = require('crypto');

const { rou, lang, validation, mailGun } = require('../../utils')
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

    const email = req.body.email;
    const cryptoToken = crypto.randomBytes(80).toString('hex');
    const validLink = `http://localhost:3001${rou.registerForm}?token=${cryptoToken}`

    //Validation Input
    const { error } = validation.registerValidation(req.body);
    if (error) {
        req.flash('loginRegister', {
            status: "is-warning",
            msg: error.message
        })
        return res.status(302).redirect(rou.loginRegister);
    }

    //Validation DB
    const queues = await Queues.findOne({ email })
    if (queues) {
        //EmailSender
        await mailGun({
            to: email,
            subject: "Validation Account",
            text: queues.token
        });
    } else {
        const createQueue = Queues({
            email,
            token: cryptoToken,
        });

        try {
            await createQueue.save();
            await mailGun({
                to: email,
                subject: "Validation Account",
                text: `<a href="${validLink}">valid Link</a>`
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