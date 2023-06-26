import { Controller, worker, viewResult, assign, route, HTTP_METHOD } from "fortjs";

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

    @worker(HTTP_METHOD.Get)
    @route('/chat')
    async chat() {
        return viewResult('../src/views/default/chat.html');
    }
}