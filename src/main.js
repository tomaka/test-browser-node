import * as smoldot from '@substrate/smoldot-light';
import chainSpec from './westend.json';

let client;

document.getElementById("start").addEventListener("click", () => {
    let promise = Promise.resolve();
    if (client) promise = client.terminate();

    promise.then(() => {
        document.getElementById('logs').innerText = '';

        client = smoldot.start({
            logCallback: (level, target, msg)  => {
                document.getElementById('logs').innerText += "[" + target + "] " + msg + "\n";
                console.log(msg);
            },
            maxLogLevel: 4,
            //forbidNonLocalWs: true,
            enableExperimentalWebRTC: true
        });

        if (crossOriginIsolated) {
            const worker = new Worker(new URL('./worker.js', import.meta.url));
            client.createBackgroundRunnable().then((obj) => worker.postMessage(obj));
        } else {
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
