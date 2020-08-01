import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "./routes";

export const createApp = async () => {
    Fort.routes = routes;
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }]
    await Fort.create();
    process.env.APP_URL = "http://localhost:4000";
};

if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.info("Your fort is located at address - localhost:4000");
    }).catch(err => {
        console.error(err);
    });
}