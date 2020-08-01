import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "./routes";
import { SquirrellyViewEngine } from "./extra/squirrelly_view_engine";

export const createApp = async () => {
    Fort.routes = routes;
    Fort.viewEngine = SquirrellyViewEngine;
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];
    await Fort.create();
    process.env.APP_URL = "http://localhost:4000";
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.info(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

