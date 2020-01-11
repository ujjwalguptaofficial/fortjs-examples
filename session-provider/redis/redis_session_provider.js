import { SessionProvider, promise } from "fortjs";

export class RedisSessionProvider extends SessionProvider {

    // session implementation method

    get(key) {
        return promise((res, rej) => {
            this.getValueFromStore().then((result) => {
                res(result != null ? result[key] : null);
            }).catch(rej);
        })
    }

    getAll() {
        return promise((res, rej) => {
            this.getValueFromStore().then((result) => {
                res(result == null ? {} : result);
            }).catch(rej);
        })
    }



    async set(key, value) {
        let savedValue = await this.getValueFromStore();
        if (savedValue == null) {
            this.createSession();
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

    isExist(key) {
        return promise((res, rej) => {
            this.get(key).then(value => {
                res(value != null);
            }).catch(rej);
        })
    }

    async clear() {
        // expire cookie in browser
        await this.destroySession();
        await this.removeValueFromStore();
    }

    remove(key) {
        return promise((res, rej) => {
            this.getValueFromStore().then(savedValue => {
                if (savedValue != null) {
                    delete savedValue[key];
                    this.addValueInStore(savedValue).then(res).catch(rej);
                }
                else {
                    res();
                }
            }).catch(rej);
        })
    }

    // redis helper methods

    getValueFromStore() {
        return promise((res, rej) => {
            if (this.sessionId == null) {
                res(null);
                return;
            }
            redisClient.hgetall(this.sessionId, (err, result) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(result);
                }
            });
        })
    }

    addValueInStore(value) {
        return promise((res, rej) => {
            redisClient.hmset(this.sessionId, value, (err, result) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(result);
                }
            });
        });
    }

    removeValueFromStore() {
        return promise((res, rej) => {
            redisClient.del(this.sessionId, (err, result) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(result);
                }
            });
        });
    }
}