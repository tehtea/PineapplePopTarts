"use strict";
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const docx = require("docx");
const fs = require("fs");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers:'SSLv3'
  },
  auth: {
    user: '@e.ntu.edu.sg',  //SENDER EMAIL HERE
    pass: ''  //PASSWORD HERE
  }
});


// Create attachment
let doc = new docx.Document();
console.log('Creating Empty Document...');
// Add some content in the document
let paragraph = new docx.Paragraph("Some cool text here.");
// Add more text into the paragraph if you wish
paragraph.addRun(new docx.TextRun("Lorem Ipsum Foo Bar"));
doc.addParagraph(paragraph);
console.log('Adding Content...');
// Used to export the file into a .docx file
let packer = new docx.Packer();
packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Status Summary Report.docx", buffer);
});
console.log('Document Exported...');

// sending emails at periodic intervals
cron.schedule('*/10 * * * * *', () => {  //EVERY 10 SECONDS
  console.log("---------------------");
  console.log("Sending Email...");
  let mailOptions = {
    from: '"NAME HERE" <EMAIL HERE>', // SENDER EMAIL HERE
    to: "RECIPIENT HERE", // RECIPIENT EMAIL HERE
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