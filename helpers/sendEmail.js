const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, PORT = 3000 } = process.env;

const sendEmail = (userEmail, verificationToken) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "verify_account@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: "verify_account@meta.ua",
    to: userEmail,
    subject: "Please confirm your email",
    html: `<a href="http://localhost:${PORT}/api/v1/users/verify/${verificationToken}" target="_blank">Follow the link to confirm</a>`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log("SENDED", info))
    .catch((err) => console.log("ERROR", err));
};

module.exports = sendEmail;
