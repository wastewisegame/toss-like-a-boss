let app = require('../server.js');
let testServer = require('supertest');

describe('Test the route path', () => {
    test('should respond 200 to /logout',  async () => {
        let response = await testServer(app).post('/api/user/logout')
        expect(response.statusCode).toBe(200);
    })

    test('should respond 403 to not logged ')






    test('/user should return user info when authenticated', async () => {
        //Login 
        // agent remembers cookies
        let agent = testServer.agent(app);
        const response = await agent.post('/api/user/login')
                                    // send data
                                    .send({username: 'miles', password: '1234'})
        expect(response.statusCode).toBe(200);
        // GET to /user
        const userResponse = await agent.get('/api/user');
        expect(userResponse.statusCode).toBe(200); 
    })
})



