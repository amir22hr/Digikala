/**
 * This function creates a Digiplus member expiry date
 * @param {number|string} month 
 * @returns {string}
 */
const expiryDigiplus = (month) => {
    //get Date Now
    const dateNow = new Date().toLocaleDateString('en-us').split('/')
    let yearNow = Number(dateNow[2])
    let monthNow = Number(dateNow[0])
    let dayNow = Number(dateNow[1])

    let expiryMonth = 0

    switch (Number(month)) {
        case 1:
            //expiry 1 Month
            if (monthNow === 12) expiryMonth = 1
            else expiryMonth = monthNow + 1
            break;

        case 3:
            //expiry 3 Month
            if (monthNow === 10) expiryMonth = 1
            else if (monthNow === 11) expiryMonth = 2
            else if (monthNow === 12) expiryMonth = 3
            else expiryMonth = monthNow + 3
            break;

        default:
            console.log("error expiry month")
            break;
    }

    //create expiry date
    const expiryDate = new Date(Date.UTC(
        yearNow,
        expiryMonth,
        dayNow
    ));

    //return persian date string
    return expiryDate.toLocaleDateString('fa-ir')
}

module.exports = expiryDigiplus
