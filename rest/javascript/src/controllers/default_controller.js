import { Controller, worker, viewResult, assign, route } from "fortjs";

export class DefaultController extends Controller {

    @worker()
    @route("/")
    async index(@assign('FortJs') title) {

        const data = {
            title: title
        }
        const result = await viewResult('../src/views/default/index.html', data);
        return result;

    }
}