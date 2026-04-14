const axios = require('axios');

async function test() {
    const api = axios.create({
        baseURL: "https://talentcraft-2.onrender.com",
        withCredentials: true
    })
    try {
        const res = await api.post('/api/auth/register', {
            username: 'testuser_' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        });
        console.log("Register response", res.status, res.headers['set-cookie']);
        console.log(res.data);
    } catch(err) {
        console.error("Register Error:", err.response?.data);
    }
}
test();
