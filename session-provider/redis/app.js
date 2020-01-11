import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
import redis from "redis";
import { RedisSessionProvider } from './redis_session_provider';

export class App extends Fort {

    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = MustacheViewEngine;
        this.sessionProvider = RedisSessionProvider;
    }

    initRedis() {
        global.redisClient = redis.createClient();
        return new Promise((res, rej) => {
            redisClient.on('connect', res);
            redisClient.on('error', rej);
        });
    }

    closeRedis() {
        redisClient.end(true);
    }
}