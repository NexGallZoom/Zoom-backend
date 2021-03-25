import bodyParser from 'body-parser';
import express from 'express';
import https from 'https';
import fs from 'fs';
import { createServer, Server } from 'http';

import * as path from 'path';
import controller from './controller';
import { initWebSocket } from './middleware/socket';
import config from './config';

const options = {
  key: fs.readFileSync(path.join(__dirname, config.sslKey), 'utf-8'),
  cert: fs.readFileSync(path.join(__dirname, config.sslCrt), 'utf-8'),
};

const app = express();

const httpsServer = https.createServer(options, app);

app.use(bodyParser.json());
app.use(controller);

const server: Server = createServer(app);
initWebSocket(server);

server.listen(process.env.PORT || 5000, () => {
  console.log('server initialized');
});
