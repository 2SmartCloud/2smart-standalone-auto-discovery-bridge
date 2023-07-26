const Debugger = require('homie-sdk/lib/utils/debugger');
const server = require('./server');

const debug = new Debugger();

(async () => {
    try {
        await server.start();
        debug.logger('SSDP server starts correctly');
    } catch (err) {
        debug.error(err.message);
        process.exit(1);
    }
})();
