import SubstrateLiteWorker from 'worker-loader!./worker.js';

const worker = new SubstrateLiteWorker();
worker.onmessage = function (event) {
    let data = JSON.parse(event.data);
    if (!!data.params) {
        let block_height = parseInt(data.params.result.number);
        document.getElementById('blockHeight').innerText = block_height;
    }
}

worker.postMessage('{"jsonrpc":"2.0","id":2,"method":"chain_subscribeNewHeads","params":[]}');
