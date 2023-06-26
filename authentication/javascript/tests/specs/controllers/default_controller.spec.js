import { DefaultController } from "@/controllers/default_controller";
import { viewResult, Fort } from "fortjs";
import { createApp } from "@/index";

describe('DefaultController', () => {
    const controller = new DefaultController();

    beforeAll(async () => {
        await createApp();
    });

    it('index', async () => {
        controller.initialize();
        const expectedResult = await viewResult('../src/views/default/index.html', {
            title: 'FortJs'
        });
        const indexMethodOutput = await controller.index('FortJs');
        expect(indexMethodOutput).toEqual(expectedResult);
    });

    afterAll(async () => {
        await Fort.destroy();
    });
});