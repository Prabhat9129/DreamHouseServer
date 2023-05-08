const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  console.log(process.env.EMAIL_USERNAME);
  // 1- Create a transporter

  console.log({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  });
  // var transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "ffea9edc7e81ed",
  //     pass: "1797dc76a6ddfa",
  //   },
  // });

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2- Define the email options
  const mailOptions = {
    from: "Prabhat Dixit <dixit@prabhat.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3- Actually send the email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
