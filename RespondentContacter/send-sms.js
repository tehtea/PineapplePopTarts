// Account & Token ID from Twilio

var accountSid = 'AC8f68c14c3b365cf9abba4c8db460cb39'; 
var authToken = 'f6f83688de9131c8d077a818071b960e';   

// import twilio library create new client
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


//Creating and sending message to desired telephone number (Respondents)
client.messages.create({
    body: 'Hello from Node Test',
    to: '+6596192840',  // Text this number
    from: '+19733588619' // From a valid Twilio number
})
.then((message) => console.log(message.sid));