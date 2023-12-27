import * as path from "path";
import { Fort } from "fortjs";
import { routes } from "@/routes";
import { sequelize } from "@/sequelize";

async function initiateDatabase() {
    // Initialize Sequelize
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    // Sync models with the database
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
}

export const createApp = async () => {
    Fort.folders = [{
        alias: "/",
        path: path.join(__dirname, "../static")
    }];

    Fort.routes = routes;
    await initiateDatabase();
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

