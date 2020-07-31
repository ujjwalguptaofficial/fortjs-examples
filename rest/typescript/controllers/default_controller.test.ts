import { DefaultController } from "./default_controller";
import { viewResult, Fort } from "fortjs";
import { createApp } from "../index";

describe('DefaultController', () => {
    beforeAll(async () => {
         await createApp();
    });

    it('index', async () => {
        const expectedResult = await viewResult('default/index.html', {
            title: 'FortJs'
        });
        const result = await new DefaultController().index('FortJs');
        expect(result).toEqual(expectedResult);
    });

    afterAll(() => {
        return Fort.destroy();
    });
});