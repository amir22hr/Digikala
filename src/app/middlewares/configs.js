const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser');

const keys = require('../../configs/keys');

/**
 * define express app and return back
 * @returns app
 */
module.exports = () => {
    /**
     * -------------- GENERAL SETUP ----------------
     */

    // Create the Express application
    const app = express()

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs')
    //
    app.use(express.static('src/app/public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    /**
     * -------------- SESSION SETUP ----------------
     */
    app.use(session({
        secret: keys.app.secret,
        resave: false,
        saveUninitialized: true,
    }));

    app.use(flash());

    return app
}