import * as smoldot from '@substrate/smoldot-light/no-auto-bytecode';
import chainSpec from './westend.json';

let client;

document.getElementById("start").addEventListener("click", () => {
    let promise = Promise.resolve();
    if (client) promise = client.terminate();

    promise.then(() => {
        document.getElementById('logs').innerText = '';

        const worker = new Worker(new URL('./worker.js', import.meta.url));

        worker.onerror = (err) => console.error(err);

        const bytecode = new Promise((resolve) => {
            worker.onmessage = (event) => resolve(event.data);
        });

        const { port1, port2 } = new MessageChannel();
        worker.postMessage(port1, [port1]);

        client = smoldot.startWithBytecode({
            bytecode,
            logCallback: (level, target, msg)  => {
                document.getElementById('logs').innerText += "[" + target + "] " + msg + "\n";
                console.log(msg);
            },
            maxLogLevel: 4,
            portToWorker: port2,
            //forbidNonLocalWs: true,
        });

        if (!crossOriginIsolated) {
            document.getElementById('logs').innerText += "crossOriginIsolated is false" + "\n";
        }

        if (document.getElementById("bootnode").value)
            chainSpec.bootNodes = [
                document.getElementById("bootnode").value
            ];
    
        client.addChain({
            chainSpec: JSON.stringify(chainSpec),
        }).catch((err) => {
            document.getElementById('logs').innerText += "Error while creating chain: " + err.toString();
        })
    })
})

document.getElementById("stop").addEventListener("click", () => {
    if (client)
        client.terminate().then(() => { client = null })
})
