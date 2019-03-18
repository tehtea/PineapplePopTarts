// Account & Token ID from Twilio
var accountSid = 'AC8f68c14c3b365cf9abba4c8db460cb39';
var authToken = 'f6f83688de9131c8d077a818071b960e'; 

var twilio = require('twilio'); //Import Twilio library
var client = new twilio(accountSid, authToken);

var socket = require('socket.io'); // Import socket.io libraries 
var io = socket.listen(4000); // Make the server listen to messages on port 4000

io.on('connection', (socket) =>{

    console.log('connected:', socket.client.id);

    /*socket.on('serverEvent', data =>{
        console.log('new messsage from client' , data);
    });*/

    socket.on('incidentreport', (reportdata)=>{

    //Extract infomation from reportdata
    
    var message = reportdata.message;
    var respondentcontact = reportdata.respondentcontactinfo;

    //Creating and sending message to desired telephone number (Respondents)
    client.messages.create({
    body: 'Hello from Node' ,//reportdata.message
    to: '+6596192840',  // Text this number (reportdata.respondentcontactinfo)
    from: '+19733588619' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));   

    })


});