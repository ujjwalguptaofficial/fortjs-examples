
import { Wall, textResult } from "fortjs";
import helmet from 'helmet';

export class HelmetWall extends Wall {
    async onIncoming() {
        await this.middleware(helmet()).execute();
    }
}    
