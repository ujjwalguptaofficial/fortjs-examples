import axios from "axios";


describe('/user', () => {

    const httpRequest = axios.create({
        baseURL: process.env.APP_URL + "/user",
        timeout: 1000,
        validateStatus(status) {
            return true
        },
    });

    let cookie;
    httpRequest.interceptors.request.use(config => {
        if (cookie != null) {
            config.headers['Cookie'] = cookie;
        }
        return config;
    });

    it('/get all users without unauthenticated', async () => {
        const response = await httpRequest.get('/');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toEqual('text/plain');
        expect(response.data).toEqual("Not authenticated");
    });

    it("login", async () => {
        const defaultHttpRequest = axios.create({
            baseURL: process.env.APP_URL + "/",
            timeout: 1000
        });
        const response = await defaultHttpRequest.post("/login", {
            email: "ujjwal@mg.com",
            password: "admin"
        });
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(`Welcome Ujjwal`);
        cookie = response.headers['set-cookie'][0];
    })

    it('/get all users', async () => {
        const response = await httpRequest.get('/', {
            headers: {
                accept: 'application/json'
            }
        });
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data).toEqual([
            { "address": "bhubaneswar india", "emailId": "ujjwal@mg.com", "gender": "male", "id": 1, "name": "Ujjwal", "password": "admin" }
        ]);
    });

    it('/get single user', async () => {
        const response = await httpRequest.get('/1', {
            headers: {
                accept: 'application/json'
            }
        });
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data).toEqual(
            { "address": "bhubaneswar india", "emailId": "ujjwal@mg.com", "gender": "male", "id": 1, "name": "Ujjwal", "password": "admin" }
        );
    });

    it('/add user', async () => {
        const user = {
            "name": "ujjwal",
            "emailId": "ujjwal@m.com",
            "password": "12345as",
            "gender": "male",
            "address": "sadfsgbhfgtbrg"
        };
        const response = await httpRequest.post('/', user, {
            headers: {
                accept: 'application/json'
            }
        });
        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toEqual('application/json');

        expect(response.data).toEqual({ id: 2, ...user });
    });

    it('/update user', async () => {
        const user = {
            "name": "ujjwal gupta",
            "emailId": "ujjwal@m.com",
            "password": "12345as",
            "gender": "male",
            "address": "sadfsgbhfgtbrg",
            "id": 2
        };
        const response = await httpRequest.put('/', user, {
            headers: {
                accept: '*/*'
            }
        });
        expect(response.status).toEqual(200);
        expect(response.data).toEqual("user updated");
    });

    it('/check updated user', async () => {
        const user = {
            "name": "ujjwal gupta",
            "emailId": "ujjwal@m.com",
            "password": "12345as",
            "gender": "male",
            "address": "sadfsgbhfgtbrg",
            "id": 2
        };
        const response = await httpRequest.get('/2', {
            headers: {
                accept: 'application/json'
            }
        });
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('application/json');
        expect(response.data).toEqual(
            user
        );
    });

    it('/remove user', async () => {

        const response = await httpRequest.delete('/2', {
            headers: {
                accept: '*/*'
            }
        });
        expect(response.status).toEqual(200);
        expect(response.data).toEqual("user deleted");
    });

    it('/get deleted user or not existing user', async () => {
        try {
            const response = await httpRequest.get('/2', {
                headers: {
                    accept: '*/*'
                }
            });
        }
        catch (ex) {
            expect(ex.response.status).toEqual(404);
            expect(ex.response.data).toEqual('invalid user id');
        }
    });

});