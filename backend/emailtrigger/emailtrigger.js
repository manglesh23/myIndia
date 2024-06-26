const nodemailer = require("nodemailer");
require('dotenv').config();
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.AUTH_HOST,
      port: process.env.AUTH_PORT,
      secure: false,
      auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_PASSWORD,
      },
    });
    const mainOptions = {
      from: "no-reply@myindia.com",
      to,
      subject,
      text,
    };
    const response = await transporter.sendMail(mainOptions);
    return response;
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

module.exports = { sendEmail };
