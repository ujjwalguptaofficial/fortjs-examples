import axios from "axios";
import { createApp } from "..";


describe('/session', () => {

    let app;
    let httpRequest;
    let cookie;
    beforeAll(async () => {
        app = await createApp();
        await app.initRedis();
        httpRequest = axios.create({
            baseURL: process.env.APP_URL,
            timeout: 1000,
            withCredentials: true,
            validateStatus: () => {
                return true;
            }
        });

        httpRequest.interceptors.request.use(config => {
            if (cookie != null) {
                config.headers['Cookie'] = cookie;
            }
            return config;
        });
    });

    it('getAll', async () => {
        const response = await httpRequest.get('/session/getAll');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data.value).toEqual({});
    });

    it("/exist", async () => {
        const response = await httpRequest.get('/session/exist?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('text/plain');
        expect(response.data).toEqual(`key is not found`);
    })

    it("/get", async () => {
        const response = await httpRequest.get('/session/get?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data.value).toEqual(null);
    })

    it("/session/add", async () => {
        const payload = {
            key: "id",
            value: 5
        }

        const response = await httpRequest.post('/session/add', payload);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('saved');
        cookie = response.headers['set-cookie'][0];
    })

    it("/session/add", async () => {
        const payload = {
            key: "hello",
            value: "world"
        }

        const response = await httpRequest.post('/session/add', payload);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('saved');
    })

    it("/exist", async () => {
        const response = await httpRequest.get('/session/exist?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('text/plain');
        expect(response.data).toEqual(`key is found`);
    })

    it("/get", async () => {
        const response = await httpRequest.get('/session/get?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data.value).toEqual('5');
    })

    it("/session/update", async () => {
        const payload = {
            key: "id",
            value: '6'
        }

        const response = await httpRequest.post('/session/update', payload);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('updated');
    })

    it("/get", async () => {
        const response = await httpRequest.get('/session/get?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data.value).toEqual('6');
    })

    it("/remove", async () => {
        const response = await httpRequest.get('/session/remove?key=id');
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('removed');
    })

    it("/exist", async () => {
        const response = await httpRequest.get('/session/exist?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('text/plain');
        expect(response.data).toEqual(`key is not found`);
    })

    it("/get", async () => {
        const response = await httpRequest.get('/session/get?key=id');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data.value).toEqual(undefined);
    })

    it("/get for key which is not deleted", async () => {
        const response = await httpRequest.get('/session/get?key=hello');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data).toEqual({ value: 'world' });
    })

    it("/session/add-many", async () => {
        const payload = {
            key1: "hello",
            value1: 'world',
            key2: 'ujjwal',
            value2: 'gupta'
        }

        const response = await httpRequest.post('/session/add-many', payload);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('saved');
    })

    it("/getAll", async () => {
        const response = await httpRequest.get('/session/getAll');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data.value).toEqual({
            "hello": "world",
            "ujjwal": "gupta"
        });
    })

    it("/clear", async () => {
        const response = await httpRequest.get('/session/clear');
        expect(response.status).toEqual(200);
        expect(response.data).toEqual('cleared');
    })

    it("/get after clearing", async () => {
        const response = await httpRequest.get('/session/get?key=hello');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data).toEqual({ value: null });
    })

    afterAll(() => {
        app.closeRedis();
        return app.destroy();
    });

});