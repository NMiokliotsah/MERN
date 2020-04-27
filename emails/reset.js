const keys = require('../keys');

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: keys.EMAIL_RESET_SUBJECT,
        html: `
            <h1>You forget password</h1>
            <p>If not, please ignore this email</p>
            <p>Else click on link</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Restore password</a></p>
            <a href="${keys.BASE_URL}">Shop</a>
        `
    }
}