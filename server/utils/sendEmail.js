const nodemailer = require("nodemailer");

const sendEmail = async (to,subject, message,Url) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER, // Gmail
        pass: process.env.PASS, // App password
      },
    });


    const mailOptions = {
      from: process.env.USER,
      to: to,
      subject:subject,
      html: `<h2>Welcome to Our App </h2>
      <p>Please verify your email for ${message}</p>
      <a href="${Url}" style="color:blue;">Verify Email</a>
      <p>This link will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Email not sent:", error);
    throw error;
  }
  
};

module.exports = sendEmail;
