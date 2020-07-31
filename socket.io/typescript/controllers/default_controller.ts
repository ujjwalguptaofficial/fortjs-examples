import {
    Controller, DefaultWorker, Worker, htmlResult,
    textResult, renderView, viewResult, Route, HTTP_METHOD, Assign
} from "fortjs";

export class DefaultController extends Controller {

    @DefaultWorker()
    async index(@Assign('FortJs') title) {

        const model = {
            title: title
        };
        const result = await viewResult('default/index.html', model);
        return result;
    }

    @Worker(HTTP_METHOD.Get)
    @Route('/chat')
    async chat() {
        return viewResult('default/chat.html');
    }
}