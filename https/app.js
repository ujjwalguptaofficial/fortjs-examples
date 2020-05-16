import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
const fs = require('fs')

export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = MustacheViewEngine;
        this.httpServer = require("https").createServer({
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert')
        }, this.onNewRequest).listen(4000, () => {
            this.logger.info("server started at port 4000")
        });
    }
}