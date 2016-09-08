var net = require('net');
const IP = '127.0.0.1';
const PORT = 1337;

var server = net.createServer(function(socket) {
	console.log('\nClient connected');

	// Handler for incoming data event in client socket
	socket.on('data', function(data) {
		socket.write(data);
	});

	// Handler for error event in client socket
	socket.on('error', function(err) {
		if(err.code == 'ECONNRESET'){
			console.log('Connection closed abruptly.');
		}
		else{
			console.log(err);
		}
	});

	// Handler for close event in client socket
	socket.on('close', function() {
		console.log('Client disconnected');
	});
});

// Make the server listen in socket IP:PORT
server.listen(1337, '127.0.0.1', function(){
	console.log("Server online");
});
