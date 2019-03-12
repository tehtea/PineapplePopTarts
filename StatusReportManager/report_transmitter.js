"use strict";
const nodemailer = require("nodemailer");
const cron = require("node-cron");

module.exports = {
    createTransport: function() {
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
              ciphers:'SSLv3'
            },
            auth: {
              user: '',  //SENDER EMAIL HERE
              pass: ''  //SENDER PASSWORD HERE
            }
          });
          return transporter;
    },

    sendEmail: function(transporter) {
        cron.schedule('*/10 * * * * *', () => {  //EVERY 10 SECONDS
            console.log("---------------------");
            console.log("Sending Email...");
            let mailOptions = {
              from: '"NAME HERE" <EMAIL HERE>', // SENDER EMAIL HERE
              to: "RECIPIENT EHRE", // RECIPIENT HERE
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: "<b>Hello world?</b>", // html body
              attachments: [  
                  {   
                    filename: "Status Summary Report.docx",    
                    path: __dirname + '\\Status Summary Report.docx'
                  }   
                ]
            };
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
              console.log('Error');
              return console.log(error);
              }
              console.log('Message sent: ' + info.response);
            });
          });
    }
};