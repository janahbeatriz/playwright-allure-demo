require('dotenv').config(); // Add this at the top 

module.exports = {
    validUser: {
      username: process.env.STANDARD_USER,
      password: process.env.PASSWORD
    },
    lockedUser: {
      username: process.env.LOCKED_USER,
      password: process.env.PASSWORD
    },
    invalidCredentials: {
      username: 'invalid_user',
      password: 'wrong_password'
    }
  };