const dgram = require('dgram');

// Known server IP and PORT
const IP = '127.0.0.1';
const PORT = 1337;

// Create UDP socket object for client
const client = dgram.createSocket('udp4');

var stdin = process.stdin;
var stdout = process.stdout;

// Handler for incoming data on the standar input
stdin.on('data', function (msg) {
	// Sending message to server
	client.send(msg, 0, msg.length, PORT, IP, function(err){});
});

// Handler for incoming msg
client.on('message', function(msg, rinfo){
	console.log('Echo from server:' + msg.toString());
});