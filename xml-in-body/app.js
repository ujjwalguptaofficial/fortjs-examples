import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
import { XmlToJsonParser } from './xml-parser';


export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = MustacheViewEngine;
        this.xmlParser = XmlToJsonParser;
    }
}