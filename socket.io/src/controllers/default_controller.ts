import { Controller, viewResult, assign, http } from "fortjs";

export class DefaultController extends Controller {

    @http.get("/")
    async index(@assign('FortJs') title: string) {
        const data = {
            title: title
        };
        const result = await viewResult('/src/views/default/index.html', data);
        return result;
    }

    @http.get('/chat')
    async chat() {
        return viewResult('/src/views/default/chat.html');
    }
}