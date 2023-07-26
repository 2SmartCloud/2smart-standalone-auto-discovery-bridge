const { Server }     = require('node-ssdp');
const { v1: uuidv1 } = require('uuid');

// Unique Service Name
const USN = 'upnp:2smart:discovery';

const server = new Server({
    udn : uuidv1() // generate unique device name on each server start
});

server.addUSN(USN);

module.exports = server;

