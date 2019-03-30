var io = require('./Apps/node_modules/socket.io-client');

// SMS Server
var SOCIALMEDIA_SERVER = 'http://172.21.146.196:5050';
var socialMediaSocket = io.connect(SOCIALMEDIA_SERVER);

module.exports = {	
	socialMediaNew: function(obj) {
		socialMediaSocket.emit('socialMediaNew',obj);
	},
	
	socialMediaUpd: function(obj, newIncident) {
		var data = {
			updateInc: obj,
			newInc: newIncident
		};
		socialMediaSocket.emit('socialMediaUpd',data);
	}
}