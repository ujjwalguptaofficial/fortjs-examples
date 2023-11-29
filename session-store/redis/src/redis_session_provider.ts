import { ISessonStore } from "fortjs";
import { REDIS_CLIENT } from ".";

export class RedisSessionStore implements ISessonStore {

    sessionId: string;

    constructor(sessionId) {
        this.sessionId = sessionId;
    }

    async isAnyExist(): Promise<boolean> {
        const sessionValie = await this.getValueFromStore();
        return sessionValie != null;
    }

    async get(key) {
        const sessionValie = await this.getValueFromStore();
        return sessionValie != null ? sessionValie[key] : null;
    }

    async getAll() {
        const sessionValie = await this.getValueFromStore();
        return sessionValie == null ? {} : sessionValie;
    }



    async set(key, value) {
        let savedValue = await this.getValueFromStore();
        if (savedValue == null) {
            savedValue = { [key]: value };
        }
        else {
            // add or update value
            savedValue[key] = value;
        }
        await this.addValueInStore(savedValue);
    }

    setMany(values) {
        return Promise.all(
            Object.keys(values).map((key) => {
                return this.set(key, values[key]);
            })
        );
    }

    async isExist(key) {
        // better to write a query which can check only exist without get
        // e.g - select count(*) from SessionTable where key=key;
        const value = await this.get(key)
        return value != null;
    }

    async clear() {
        await this.removeValueFromStore();
    }

    async remove(key) {
        if (this.sessionId != null) {
            await REDIS_CLIENT.hDel(this.sessionId, key);
        }
    }

    // // redis helper methods

    async getValueFromStore() {
        if (this.sessionId == null) {
            return;
        }
        return REDIS_CLIENT.hGetAll(this.sessionId);
    }

    async addValueInStore(value) {
        return REDIS_CLIENT.hSet(this.sessionId, value);
    }

    async removeValueFromStore() {
        return REDIS_CLIENT.del(this.sessionId);
    }
}