import * as substrate_lite from 'substrate-lite';

// `null` on startup. Will store the client, once it has finished initializing.
let client = null;

// Array of RPC queries received before initialization has finished. Will be sent after
// initialization.
let unsent_rpcs = [];

onmessage = function (event) {
    if (client != null) {
        client.send_json_rpc(event.data)
    } else {
        if (unsent_rpcs.length > 100)
            throw "receiving RPC requests while unsent RPCs queue is already large";
        unsent_rpcs.push(event.data);
    }
};

fetch("westend.json")
    .then((chain_specs) => chain_specs.text())
    .then((chain_specs) => substrate_lite.start({
        chain_spec: chain_specs,
        json_rpc_callback: (response) => postMessage(response)
    }))
    .then((c) => {
        client = c;
        unsent_rpcs.forEach((rpc) => client.send_json_rpc(rpc));
        unsent_rpcs = [];
    });
