import nodemailer from 'nodemailer';

const SENDER_EMAIL = 'thiago.rankmyapp@gmail.com';
const SENDER_PASSWORD = 'thiago123!';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD
  }
});

export const sendEmail = (to, subject, html) => {
  transporter.sendMail({
    from: SENDER_EMAIL,
    to, subject, html
  });
}