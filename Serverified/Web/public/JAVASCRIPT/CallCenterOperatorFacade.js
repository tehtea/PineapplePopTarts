// Design pattern - facade for call center operator subsystem
const DATABASE_SERVER = 'http://172.21.146.196:5000';
var socket = io.connect(DATABASE_SERVER);

function checkRecord(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('validateRecordID', recordID); 
		socket.on('validateRecordIDDone', function(result) {
			resolve(result);
		});
	});
}

function getRespondents(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('getRespondents', recordID); 
		socket.on('getRespondentsDone', function(result) {
			resolve(result);
		});
	});
}

function getUnresolvedIncidents() {
	return new Promise((resolve, reject) => {
		socket.emit('getUnresolvedIncidents'); 
		socket.on('getUnresolvedIncidentsDone', function(result) {
			resolve(result);
		});
	});
}