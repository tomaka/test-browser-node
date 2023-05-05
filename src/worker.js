import * as smoldot from '@substrate/smoldot-light/worker';
import { compileBytecode } from '@substrate/smoldot-light/bytecode';

compileBytecode().then((bytecode) => postMessage(bytecode))
onmessage = (msg) => smoldot.run(msg.data);
