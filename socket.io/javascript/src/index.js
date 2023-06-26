import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { Server } from "socket.io";


const initSocketIo = () => {
    const io = new Server(Fort.httpServer);
    io.on("connection", (socket) => {
        Fort.logger.info("user connected");
        socket.on('disconnect', () => {
            Fort.logger.info('user disconnected');
        });

        socket.on('chat message', (msg) => {
            Fort.logger.info(`message is ${msg}`);
            io.emit('chat message', msg);
        });
    });
}

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
        initSocketIo();
    }).catch(err => {
        console.error(err);
    });
}
