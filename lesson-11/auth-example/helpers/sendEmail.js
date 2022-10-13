const sgMail = require('@sendgrid/mail');
const { sendgridApiKey } = require('../config');

function sendEmail({ to, subject, html }) {
    sgMail.setApiKey(sendgridApiKey);

    sgMail.send({
        from: 'av.ssf4@gmail.com',
        to,
        subject,
        html,
    });
}

module.exports = sendEmail;
