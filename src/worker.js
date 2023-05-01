import * as smoldot from '@substrate/smoldot-light/worker';

onmessage = (obj) => {
    smoldot.run(obj, 1.0);
};
