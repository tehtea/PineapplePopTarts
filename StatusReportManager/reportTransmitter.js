"use strict";
const nodemailer = require("nodemailer");
const senderUsername = "pineapplepoptartscms@gmail.com";
const senderPassword = "Il0vehuangli";
const senderEmail = "pineapplepoptartscms@gmail.com";
const senderName = "CMS";
const recipientEmail = "JCHEW032@e.ntu.edu.sg";

module.exports = {
  sendEmail: function () {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderUsername,  //SENDER EMAIL HERE
        pass: senderPassword  //SENDER PASSWORD HERE
      }
    });
    let mailOptions = {
      from: senderName + ' <' + senderEmail + '>', // SENDER EMAIL HERE
      to: recipientEmail, // RECIPIENT HERE
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
    console.log("Sending Email...");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error');
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};