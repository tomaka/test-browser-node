import * as smoldot from '@substrate/smoldot-light';
import chain_spec from './westend.json';

const client = smoldot.start({
    maxLogLevel: 3,
    forbidNonLocalWs: true,
});

client.addChain({
    chainSpec: JSON.stringify(chain_spec),
    jsonRpcCallback: (response) => {
        let data = JSON.parse(response);
        if (!!data.params) {
            let block_height = parseInt(data.params.result.number);
            document.getElementById('blockHeight').innerText = block_height;
        }
    }
})
    .then((chain) => {
        chain.sendJsonRpc('{"jsonrpc":"2.0","id":2,"method":"chain_subscribeNewHeads","params":[]}');
    });
