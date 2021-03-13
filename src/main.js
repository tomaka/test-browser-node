import * as smoldot from 'smoldot';

fetch("westend.json")
    .then((chain_specs) => chain_specs.text())
    .then((chain_specs) => smoldot.start({
        chain_spec: chain_specs,
        max_log_level: 3,
        json_rpc_callback: (response) => {
            let data = JSON.parse(response);
            if (!!data.params) {
                let block_height = parseInt(data.params.result.number);
                document.getElementById('blockHeight').innerText = block_height;
            }
        }
    }))
    .then((client) => {
        client.send_json_rpc('{"jsonrpc":"2.0","id":2,"method":"chain_subscribeNewHeads","params":[]}');
    });
