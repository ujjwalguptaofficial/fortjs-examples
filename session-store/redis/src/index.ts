import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { createClient } from "redis";
import { RedisSessionStore } from "./redis_session_provider";

export const REDIS_CLIENT = createClient({

});

function initRedis() {
    return new Promise((res, rej) => {
        REDIS_CLIENT.on('connect', res);
        REDIS_CLIENT.on('error', rej);
    });
}

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];

    Fort.routes = routes;
    Fort.sessionStore = RedisSessionStore;
    await initRedis();
    await Fort.create();

    process.env.APP_URL = `http://localhost:${Fort.port}`;
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort has been forged and is now ready for exploration at ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

