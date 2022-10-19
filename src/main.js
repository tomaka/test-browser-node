import * as smoldot from '@substrate/smoldot-light';
import chain_spec from './substrate-node-template.json';

const client = smoldot.start({
    logCallback: (level, target, msg)  => {
        document.getElementById('logs').innerText += "[" + target + "] " + msg + "\n";
        console.log(msg);
    },
    maxLogLevel: 4,
    forbidNonLocalWs: true,
    enableExperimentalWebRTC: true
});

client.addChain({
    chainSpec: JSON.stringify(chain_spec),
})
