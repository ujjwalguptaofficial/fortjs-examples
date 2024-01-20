
import { Wall } from "fortjs";
import morgan from 'morgan';

export class MorganWall extends Wall {
    async onIncoming() {
        await this.middleware(morgan('tiny')).execute();
    }
}    
