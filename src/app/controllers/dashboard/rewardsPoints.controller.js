const { rou, lang, faErrors, validation } = require('../../utils')
const { Customer, Reward } = require('../../models')

const get = async (req, res) => {

    let setFlash = req.flash('dashboard_rewardsPoints')
    if (setFlash.length === 0) setFlash = null

    //Find All rewards
    const rewards = await Reward.find()
    const customerRewards = await Customer.findById(req.user._id)
    const existRewards = customerRewards.items.get_rewards

    const data = {
        title: lang.dashboard_rewardsPoints,
        user: req.user,
        flash: setFlash,
        rou,
        lang,
        rewards,
        myRewards: existRewards.length !== 0 ? existRewards : [0]
    }

    res.render('dashboard/rewardsPoints', data)

}

const post = async (req, res) => {

    try {

        //Check Validation
        const { error } = validation.rewardsPoints(req.body)
        if (error) {
            req.flash('dashboard_rewardsPoints', error.message)
            return res.status(302).redirect(rou.dashboard_rewardsPoints);
        };

        //define collections
        const customer = await Customer.findById(req.user._id);
        const reward = await Reward.findById(req.body.id);

        //If input != reward
        if (req.body.id != reward._id) {
            req.flash('dashboard_rewardsPoints', faErrors['rewardsPoints.notMath'])
            return res.status(302).redirect(rou.dashboard_rewardsPoints);
        };

        //Variables
        const customerPoint = Number(customer.items.points);
        const rewardPoint = Number(reward.get_points);
        //Check Customer Point >= Reward point
        if (customerPoint >= rewardPoint) {
            //Add code ro customer 
            await customer.items.get_rewards.push(reward.code);
            //Decrease points
            customer.items.points = (customerPoint - rewardPoint);
            customer.save();
        } else {
            req.flash('dashboard_rewardsPoints', faErrors['rewardsPoints.notEnough'])
            return res.status(302).redirect(rou.dashboard_rewardsPoints);
        }

    } catch (error) {
        console.log(error)
    }

    return await res.status(302).redirect(rou.dashboard_rewardsPoints)
}

module.exports = {
    get,
    post
}