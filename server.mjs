import express from 'express';
import * as path from 'node:path';

const app = express();
app.use((req, res, next) => {
    res.append('Cross-Origin-Opener-Policy', 'same-origin');
    res.append('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
app.use(express.static('./dist'));
app.listen(8000);
