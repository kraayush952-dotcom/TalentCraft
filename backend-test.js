async function test() {
    try {
        const payload = {
            username: 'testuser_' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        };
        const response = await fetch("https://talentcraft-3.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log("Register response", response.status);
        console.log(data);
    } catch(err) {
        console.error("Register Error:", err);
    }
}
test();
