// const dbManager = require('../DatabaseRetriever');

// const expect = require('chai').expect;
// const io = require('socket.io-client')


// describe("createNewIncident", function() {
//     var socket;

//     beforeEach(function(done) {
//         // Setup
//         socket = io.connect('http://localhost:5000', {
//             'reconnection delay' : 0
//             , 'reopen delay' : 0
//             , 'force new connection' : true
//         });
//         socket.on('connect', function() {
//             console.log('worked...');
//             done();
//         });
//         socket.on('disconnect', function() {
//             console.log('disconnected...');
//         })
//     });

//     afterEach(function(done) {
//         // Cleanup
//         if(socket.connected) {
//             console.log('disconnecting...');
//             socket.disconnect();
//         } else {
//             // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
//             console.log('no connection to break...');
//         }
//         done();
//     });


//     describe("valid incident", function() {
//         // obj = {
//         //     name - string
//         //     contact - int
//         //     address - string
//         //     unitNum - string
//         //     descr - string
//         //     insName - string
//         //     respondentRequested - array
//         // }

//         socket.emit('createNewIncident', obj)
//     });

//     // describe("invalidPassword", function() {
//     //     it('should return failure message', function(done) {

//     //     });
//     // });

//     // describe("invalidPassword", function() {
//     //     it('should return failure message', function(done) {

//     //     });
//     // });
// });