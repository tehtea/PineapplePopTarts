module.exports = {
    fetchIncidents: function () {
        // Run it every 5 seconds (parameter in miliseconds)
        //        setInterval(() => {
        let retrieval = new Promise(function (resolve, reject) {
            var io = require("socket.io-client");
            var socket = io.connect('http://localhost:5000', { reconnect: true });
            console.log('connect');
            // Connect to server
            socket.on('connect', function () {
                // Request data from database
                socket.emit('srRequest');
                console.log('srRequest');
                // Retrieve data
                socket.on('srRequestDone', function (result) {
                    console.log('resolve');
                    resolve(result);
                });
            });
            // Disconnect
            socket.emit('disconnect');
        });
        retrieval.then(function (result) {
            // Insert your code here
            //console.log(result);
            console.log(result[0].RecordID);
            return result;
            /* Notes:
            *	result[0] is newincident
            *	result[1] is updateincident
            *	result[2] is respondentRequest
            */
        });
        //       }, 5000);

    },
};