import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { HelmetWall } from "@/walls/helmet_wall";

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];

    Fort.routes = routes;
    Fort.walls = [HelmetWall]

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

