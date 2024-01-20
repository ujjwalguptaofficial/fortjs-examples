import { Controller, viewResult, assign, http } from "fortjs";

export class DefaultController extends Controller {

    @http.get("/")
    async index(@assign('FortJs') title: string) {
        const data = {
            title: title
        };

        const result = await viewResult('src/views/default/index.html', data);
        return result;
    }
}