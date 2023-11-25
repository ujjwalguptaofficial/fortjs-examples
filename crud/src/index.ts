import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { SquirrellyViewEngine } from "@/utils/squirrelly_view_engine";
import { cwd } from "process";

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];

    Fort.routes = routes;
    Fort.viewEngine = SquirrellyViewEngine;
    Fort.viewPath = path.join(cwd(),"src/views");

    await Fort.create();
    process.env.APP_URL = `http://localhost:${Fort.port}`;
};
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

