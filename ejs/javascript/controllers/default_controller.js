import { Controller, DefaultWorker, htmlResult, textResult, renderView, viewResult } from "fortjs";

export class DefaultController extends Controller {
    @DefaultWorker()
    async index() {
        const model = {
            title: 'FortJs'
        }
        const result = await viewResult('default/index.ejs', model);
        return result;
    }
}