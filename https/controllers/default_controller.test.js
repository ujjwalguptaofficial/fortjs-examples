import { DefaultController } from "./default_controller";
import { viewResult, Fort } from "fortjs";
import { createApp } from "../index";

describe('DefaultController', () => {
    let controller;
    beforeAll(async () => {
        await createApp();
        controller = new DefaultController();
    });

    it('index', async () => {
        controller.initialize();
        const expectedResult = await viewResult('default/index.html', {
            title: 'FortJs'
        });
        const indexMethodOutput = await controller.index('FortJs');
        expect(indexMethodOutput).toEqual(expectedResult);
    });

    afterAll(() => {
        return Fort.destroy();
    });
});