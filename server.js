const http = require('http');

const app = require('./app');
const { spinner, openDefaultUrl } = require('./src/app/utils')
const { port, openBrowser } = require('./src/configs/keys')

/**
 * -------------- SERVER ----------------
 */

// Create Server
const server = http.createServer(app);
const host = `http://localhost:${port}`

// Server listens on http://localhost:3001
server.listen(port);

// If Server Error
server.on("error", err => {
    spinner(err, 'fail')
})

// If Server Connected
server.on("listening", async () => {
    // Succeed log
    spinner(`Server Started in ${host}`, 'succeed')

    // MongoDB Stater
    require('./src/configs/database/mongoDB')
    
    //Open localhost in browser, if true
    if (openBrowser === 'true')
        openDefaultUrl(host)
});