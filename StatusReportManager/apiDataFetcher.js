module.exports = {
  fetchData: function () {
    var io = require('socket.io').listen(5001),
      dl = require('delivery'),
      fs = require('fs');

    io.sockets.on('connection', function (socket) {

      var delivery = dl.listen(socket);
      delivery.on('receive.success', function (file) {
        return file;
      });
    });
  }
};