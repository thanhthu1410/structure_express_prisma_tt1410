// kich hoat env
import dotenv from 'dotenv';
dotenv.config();
// tao server
import express from  'express';
const server = express();
import {mysqlConnect} from './databases/mySQL'
mysqlConnect()

/* Body Parser Middleware*/
import bodyParser from 'body-parser';
server.use(bodyParser.json()); // support encoded bodies
/* Setup Views */
import viewConfig from './views';
server.use("/views", viewConfig);

/* Setup Api */
import apiConfig from './routes';
server.use("/apis", apiConfig);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
})