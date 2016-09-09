const net = require('net');
const IP = '127.0.0.1';
const PORT = 1337;

var stdin = process.stdin;
var stdout = process.stdout;

// Create new socket object for client
var client = new net.Socket();

// Opens the connection for socket IP:PORT
client.connect(PORT, IP, function() {
	console.log('*****Connected to server*****');

	// First message after connection
	stdout.write('Message to send: ');
});

// Handler for incoming data event in client socket
client.on('data', function(data) {
	console.log('Echo from server: ' + data);
	stdout.write('\r\rMessage to send: ');
});

// Handler for close event in client socket
client.on('close', function() {
	client.end();
	process.exit();
});

// Handler for error event in client socket
client.on('error', function(err) {
	if(err.code == 'ECONNRESET'){
		console.log('\n\nConnection closed abruptly!');
		console.log('Disconnected from server.');
	}
	else{
		console.log(err);
	}
});

// Handler for incoming data on the standar input
stdin.on('data', function (chunk) {
	client.write(chunk)	
});