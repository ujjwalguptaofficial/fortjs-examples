import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "./routes";
const fs = require('fs')

const startHttpsServer = () => {
    Fort.httpServer = require("https").createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, Fort.onNewRequest).listen(4000, () => {
        Fort.logger.info("server started at port 4000")
    });
}

export const createApp = async () => {
    Fort.routes = routes;
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];
    startHttpsServer();
    Fort.create();
    process.env.APP_URL = "http://localhost:4000";
};

if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        // Fort.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}
