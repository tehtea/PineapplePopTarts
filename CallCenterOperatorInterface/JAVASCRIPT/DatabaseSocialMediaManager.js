var io = require('./Apps/node_modules/socket.io-client');

// SMS Server
var SOCIALMEDIA_SERVER = 'http://localhost:5050';
var socialMediaSocket = io.connect(SOCIALMEDIA_SERVER);

/**
 * Facade class between database and social media subsystem
 */
module.exports = {	
	/**
	 * Send new incident to social media subsystem
	 * @param {object} obj new incident
	 */
	socialMediaNew: function(obj) {
		socialMediaSocket.emit('socialMediaNew',obj);
	},
	
	/**
	 * Send update incident to social media subsystem
	 * @param {object} obj update incident
	 */
	socialMediaUpd: function(obj, newIncident) {
		var data = {
			updateInc: obj,
			newInc: newIncident
		};
		socialMediaSocket.emit('socialMediaUpd',data);
	}
}