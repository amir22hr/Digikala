module.exports = {
    app: {
      name: 'Digikala Ecommerce',
      secret: process.env.SESSION_SECRET_KEY,
    },
    salt: process.env.SALT,
    port: process.env.PORT || 3001,
    openBrowser: process.env.OPEN_BROWSER || false,
    database: {
      url: process.env.MONGO_URI
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      tokenLife: '2d'
    },
    mail: {
      email: process.env.MAIL_EMAIL,
      password: process.env.MAIL_PASS
    },
    digiplus:{
      month1:{
        days: 30,
        price: 45900
      },
      month3:{
        days: 90,
        price: 82000
      }
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    }
  };