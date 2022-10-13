const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SEND_GRID_API_KEY } = process.env;

sgMail.setApiKey(SEND_GRID_API_KEY);

sgMail.send({
    from: 'av.ssf4@gmail.com',
    to: 'elyus.trig@minutestep.com',
    subject: 'Sendgrid test',
    html: '<h1>Email test</h1>'
})