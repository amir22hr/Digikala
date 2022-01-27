const ora = require('ora-classic');

// Elegant terminal spinner
// https://www.npmjs.com/package/ora-classic
const spinner = ora()
module.exports.spinner = (msg, status, color) => {

    switch (status.toLowerCase()) {
        case 'start':
            spinner.color = color;
            spinner.start(msg)
            break;
        case 'stop':
            spinner.stop()
            break;
        case 'fail':
            spinner.fail(msg)
            break;
        case 'info':
            spinner.info(msg)
            break;
        case 'succeed':
            spinner.succeed(msg)
            break;
        case 'warn':
            spinner.warn(msg)
            break;

        default:
            spinner.stop()
            break;
    }

}