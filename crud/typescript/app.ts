import { Fort } from 'fortjs';
import { routes } from './routes';
import { SquirrellyViewEngine } from './extra/squirrelly_view_engine';


export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = SquirrellyViewEngine;
    }
}


