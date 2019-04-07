var io = require('./Apps/node_modules/socket.io-client');

// SMS Server
var SMS_SERVER = 'http://localhost:4000';
var smsSocket = io.connect(SMS_SERVER);

/**
 * Facade class between database and SMS subsystem
 */
module.exports = {
	/**
	 * Send new incident to SMS subsystem
	 * @param {object} obj new incident
	 */
	newIncidentSendSMS: function(obj) {
		console.log(obj);
		smsSocket.emit('newIncidentSendSMS',obj);
	},

	/**
	 * Send update incident to SMS subsystem
	 * @param {object} obj update incident
	 */
	updateIncidentSendSMS: function(obj, newIncident) {
		var data = {
			updateInc: obj,
			newInc: newIncident
		};
		console.log(data);
		smsSocket.emit('updateIncidentSendSMS',data);
	}
}