import * as path from "path";
import * as socketIo from "socket.io";
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

const initSocketIo = () => {
    const io = socketIo(Fort.httpServer);
    io.on("connection", (socket) => {
        Fort.logger.info("user connected");
        socket.on('disconnect', () => {
            Fort.logger.info('user disconnected');
        });

        socket.on('chat message', (msg) => {
            Fort.logger.info(`message is ${msg}`);
        });
    });
}
if (process.env.NODE_ENV !== "test") {
    createApp().then(() => {
        Fort.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
        initSocketIo();
    }).catch(err => {
        console.error(err);
    });
}

