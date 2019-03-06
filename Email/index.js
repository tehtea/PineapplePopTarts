"use strict";
const cron = require("node-cron");
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
      ciphers:'SSLv3'
  },
  auth: {
      user: '@e.ntu.edu.sg',  //school email address
      pass: ''  //password omitted
  }
});

// sending emails at periodic intervals
var task = cron.schedule("1 * * * *", function(){
  console.log("---------------------");
  console.log("Running Cron Job");
  let mailOptions = {
    from: '"Christopher Lim" <CLIM094@e.ntu.edu.sg>', // sender address
    to: "limzui@hotmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});

task.start();