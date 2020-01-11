import * as path from "path";
import { App } from "./app";

export const createApp = async () => {
    const app = new App();
    await app.create({
        folders: [{
            alias: "/",
            path: path.join(__dirname, "../static")
        }]
    });
    process.env.APP_URL = "http://localhost:4000";
    return app;
};

if (process.env.NODE_ENV !== "test") {
    createApp().then(async (app) => {
        app.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
        await app.initRedis();
        app.logger.debug('connected to redis server');
    }).catch(err => {
        console.error(err);
    });
}
