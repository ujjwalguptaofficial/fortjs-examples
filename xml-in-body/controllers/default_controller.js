import { Controller, DefaultWorker, textResult, viewResult, Worker, Assign, Route, jsonResult } from "fortjs";

export class DefaultController extends Controller {
    @DefaultWorker()
    async index(@Assign('FortJs') title) {

        const data = {
            title: title
        }
        const result = await viewResult('default/index.html', data);
        return result;

    }

    @Worker()
    @Route("/xml")
    async xmlTest() {
        this.logger.debug("data received", this.body)
        return jsonResult(this.body);
    }
}