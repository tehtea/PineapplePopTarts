module.exports = {
    fetchIncidents: function () {
        return new Promise(function (resolve, reject) {
            var io = require("socket.io-client");
            var socket = io.connect('http://localhost:5000', { reconnect: true });
            // Connect to server
            socket.on('connect', function () {
                // Request data from database
                socket.emit('srRequest');
                // Retrieve data
                socket.on('srRequestDone', function (result) {
                    // Disconnect
                    socket.emit('disconnect');
                    resolve(result);
                });
            });
        });
    },
};