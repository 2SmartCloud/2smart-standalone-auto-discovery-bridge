const assert = require('assert');
const { Client } = require('node-ssdp');

const server = require('./server');

const client = new Client();

// Time limit for current test
const TEST_TIME = 1000 * 10; // 10 seconds

// Process server response
client.on('response', (headers, statusCode, rinfo) => {
    try {
        // headers testing
        assert.strictEqual(headers.hasOwnProperty('ST'), true);
        assert.strictEqual(headers.hasOwnProperty('USN'), true);
        assert.strictEqual(headers.hasOwnProperty('DATE'), true);
        assert.strictEqual(headers.hasOwnProperty('SERVER'), true);
        assert.strictEqual(headers.hasOwnProperty('EXT'), true);
        assert.strictEqual(headers.hasOwnProperty('LOCATION'), true);

        // status code testing
        assert.strictEqual(statusCode, 200);

        // rinfo testing
        assert.strictEqual(rinfo.hasOwnProperty('address'), true);
        assert.strictEqual(rinfo.hasOwnProperty('family'), true);
        assert.strictEqual(rinfo.hasOwnProperty('port'), true);
        assert.strictEqual(rinfo.hasOwnProperty('size'), true);

        console.log('OK');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

// Unique Service Name to test
const USN = 'upnp:2smart:discovery';

(async () => {
    try {
        await server.start();

        // Set timeout on test
        setTimeout(() => {
            process.exit(1);
        }, TEST_TIME);

        // Send message to server every 2 seconds
        setInterval(() => {
            client.search(USN);
        }, 2000);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
