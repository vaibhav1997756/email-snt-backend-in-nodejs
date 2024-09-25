// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Email Sending Route
// app.post('/send-email', async (req, res) => {
//   const { name, email, message } = req.body;

//   try {
//     // Nodemailer setup
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'vaibhav_singh@jaipuria.edu.in', // your Gmail email
//         pass: 'Vaibhav@1997', // your Gmail password
//       },
//     });

//     // Email options
//     let mailOptions = {
//       from: email,
//       to: 'vaibhav_singh@jaipuria.edu.in', // recipient email
//       subject: 'Contact Us Form Message',
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Sending Route
app.post('/send-email', async (req, res) => {
  const { name, email, company, phone, message } = req.body;

  try {
    // Nodemailer setup
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail email from .env
        pass: process.env.EMAIL_PASS, // Gmail password from .env
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL, // recipient email from .env
      subject: 'Contact Us Form Message',
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
