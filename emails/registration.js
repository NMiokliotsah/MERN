const keys = require('../keys');

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: keys.EMAIL_REGISTRATION_SUBJECT,
        html: `
            <h1>Welcome to our shope</h1>
            <p>You successful create an account</p>
            <a href="${keys.BASE_URL}">Shop</a>
        `
    }
}