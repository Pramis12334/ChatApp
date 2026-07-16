const nodemailer = require('nodemailer');
const { createWelcomeEmailTemplate } = require('./email.template');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.CLIENT_ID) {
      throw new Error('Email credentials not configured. Please set up environment variables.');
    }

    const info = await transporter.sendMail({
      from: `"Chat App" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error; // Re-throw to propagate to controller
  }
};

async function sendSingupEmail(userEmail, username, clientURL) {
    const subject = 'Welcome to Chat App';
    const text = `Welcome ${username}`;
    const html = createWelcomeEmailTemplate(username,clientURL);
    await sendEmail(userEmail, subject, text, html);
}

module.exports = { 
    sendSingupEmail,

}