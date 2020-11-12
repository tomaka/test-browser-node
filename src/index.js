import SubstrateLiteWorker from 'worker-loader!./worker.js';

const worker = new SubstrateLiteWorker();
worker.onmessage = function (event) {
    console.log("Received response:", event.data);
}

worker.postMessage('{"jsonrpc":"2.0","id":1,"method":"system_name","params":[]}');

worker.postMessage('{"jsonrpc":"2.0","id":2,"method":"chain_getHeader","params":[]}');

worker.postMessage('{"jsonrpc":"2.0","id":2,"method":"chain_subscribeNewHeads","params":[]}');
