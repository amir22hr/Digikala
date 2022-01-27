//open default url | localhost:5000
/**
 * This Function open localhost in browser
 * @param {string} url 
 */
module.exports.openDefaultUrl = (url) => {
    require('child_process')
        .exec((process.platform
            .replace('darwin', '')
            .replace(/win32|linux/, 'xdg-') + 'open ' + url));
}