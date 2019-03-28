var io = require('./Apps/node_modules/socket.io-client');

// SMS Server
var SMS_SERVER = 'http://localhost:4000';
var smsSocket = io.connect(SMS_SERVER);

module.exports = {
	newIncidentSendSMS: function(obj) {
		console.log(obj);
		smsSocket.emit('newIncidentSendSMS',obj);
	},
	
	updateIncidentSendSMS: function(obj, newIncident) {
		var data = {
			updateInc: obj,
			newInc: newIncident
		};
		console.log(data);
		smsSocket.emit('updateIncidentSendSMS',data);
	}
}