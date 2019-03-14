"use strict";
const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: function () {
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: '',  //SENDER EMAIL HERE
        pass: ''  //SENDER PASSWORD HERE
      }
    });
    console.log("---------------------");
    console.log("Sending Email...");
    let mailOptions = {
      from: '"NAME HERE" <EMAIL HERE>', // SENDER EMAIL HERE
      to: "RECIPIENT EHRE", // RECIPIENT HERE
      subject: "Status Summary Report", // Subject line
      text: "Dear PMO,\n\nThe status summary report for the last 30 minutes is as attached.\n\nBest Regards,\nCMS", // plain text body
      //html: "<b>Hello world?</b>", // html body
      attachments: [
        {
          filename: "Status Summary Report.docx",
          path: __dirname + '\\Status Summary Report.docx'
        }
      ]
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error');
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};