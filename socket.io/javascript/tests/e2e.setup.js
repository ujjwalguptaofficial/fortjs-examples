import { createApp } from "../dist/app.js";

module.exports = async function (globalConfig, projectConfig) {
    await createApp();
};