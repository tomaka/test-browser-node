import * as smoldot from '@substrate/smoldot-light/worker';

onmessage = (msg) => {
    smoldot.run(msg.data, 1.0);
};
