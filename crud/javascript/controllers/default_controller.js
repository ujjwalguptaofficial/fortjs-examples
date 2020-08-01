import { Controller, DefaultWorker, viewResult, Assign } from "fortjs";

export class DefaultController extends Controller {

    @DefaultWorker()
    async index(@Assign('FortJs') title) {

        const data = {
            title: title
        }
        const result = await viewResult('default/index.html', data);
        return result;

    }
}