import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "./routes";
import { EjsViewEngine } from "./ejs_view_engine";

Fort.routes = routes;
Fort.viewEngine = EjsViewEngine;
Fort.folders = [{
    alias: "/",
    path: path.join(__dirname, "../static")
}];

Fort.create().then(() => {
    Fort.logger.info("Your fort is located at address - localhost:4000");
}).catch(err => {
    console.error(err);
});
