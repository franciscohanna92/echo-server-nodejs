const dgram = require('dgram');
const IP = '127.0.0.1';
const PORT = 1337;

// Create UDP socket object for server
const server = dgram.createSocket('udp4');

server.on('error', function(err){
	console.log('Server error: ' + err.stack);
});

// Handler for incoming msg
server.on('message', function(msg, rinfo){
	console.log(rinfo.address + ':' + rinfo.port + ' says ' + msg);
	var rMsg = reverseMsg(msg)
	server.send(rMsg, 0, rMsg.length, rinfo.port, rinfo.address, function(err){});
});

// Excute when server is online
server.on('listening', function(){
	var address = server.address();
	console.log('Server online');
});

// Binding server object to socket
server.bind(PORT, IP);

var reverseMsg = function(msg){
	m = msg.toString()
	return m.split("").reverse().join("");
}