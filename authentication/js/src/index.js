import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];
    Fort.routes = routes;

    process.env.APP_URL = `http://localhost:${Fort.port}`;

    await Fort.create();
};

if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}
