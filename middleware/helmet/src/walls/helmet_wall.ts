
import { Wall, textResult } from "fortjs";
import helmet from 'helmet';

export class HelmetWall extends Wall {
    async onIncoming() {
        const result = await this.middleware(helmet()).execute();
    }

    callMiddleWare(middleWare) {
        return new Promise((res, rej) => {
            middleWare(this.request, this.response, res);
        });
    }
}    
