const supertest = require('supertest');
const app = require('../index.js');
const request = supertest(app);
const users = require('../../database/queries/users')

let email_address = 'testUser@gmail.com';
let password = 'password';
let time_zone = 'EST';
let security_question = 'What_is_your_favorite_color?';
let security_answer = 'blue';

describe('signing up a new user', () => {
    beforeEach(async () => {
        await users.deleteUser(email_address);
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
    })

    it('should be able to sign up a new user', async (done) => {
        let signup = await request.post('/authentication/signUp').send({ email_address, password, time_zone, security_question, security_answer })
        let findUser = await users.getUser(email_address);
        expect(findUser.rows[0].email_address).toBe(email_address)
        done()
    })

    it('should hash and salt the user-supplied password', async (done) => {
        let originalPassword = password;
        let signup = await request.post('/authentication/signUp').send({ email_address, password, time_zone, security_question, security_answer })
        let findUser = await users.getUser(email_address);
        expect(findUser.rows[0].password).not.toBe(originalPassword)
        done()
    })

    it('should not re-sign up a user who has already signed up', async (done) => {
        let signup = await request.post('/authentication/signUp').send({ email_address, password, time_zone, security_question, security_answer })
        expect(signup.error).toBeFalsy()
        let signupAgain = await request.post('/authentication/signUp').send({ email_address, password, time_zone, security_question, security_answer })
        expect(signupAgain.error.text.length).toBeGreaterThan(0)
        let findUser = await users.getUser(email_address);
        expect(findUser.rows.length).toBe(1)
        expect(findUser.rows[0].email_address).toBe(email_address)
        done();
    })

})

describe('signing in a user', () => {
    beforeAll(async () => {
        await request.post('/authentication/signUp').send({ email_address, password, time_zone, security_question, security_answer })
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
    })

    it('should not sign in a user whose email address does not exist', async (done) => {
        let signin = await request.post('/authentication/signIn').send({ email_address: 'fakeEmail@gmail.com', password: 'fakePassword' })
        expect(signin.status).toBe(404)
        expect(signin.text).toBe('Invalid email address')
        done();
    })

    it('should not sign in a user who inputs an incorrect password', async (done) => {
        let signin = await request.post('/authentication/signIn').send({ email_address, password: 'fakePassword' })
        expect(signin.status).toBe(404)
        expect(signin.text).toBe('Invalid password')
        done();
    })

    it('should sign in a user who inputs a correct password, and provide them with a token', async (done) => {
        let signin = await request.post('/authentication/signIn').send({ email_address, password: 'password' })
        expect(signin.status).toBe(200)
        expect(signin.text).toBe('successful login!')
        done();
    })

})

describe('handing a forgotten password', () => {
    beforeAll(async () => {
        await users.createUser(email_address, password, time_zone, security_question, security_answer);
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
    })

    it('should provide a user with their security question based on their email, if they forgot their password', async (done) => {
        let forgotPassword = await request.get(`/authentication/forgotPassword/${email_address}`)
        expect(forgotPassword.text).toBe(security_question)
        done();
    })

    it('should not accept an incorrect response to the user security question', async (done) => {
        let failedAttempt = await request.post('/authentication/checkSecurityAnswer').send({ email_address, security_answer: 'red' })
        expect(failedAttempt.status).toBe(404);
        expect(failedAttempt.text).toBe('That answer is incorrect')
        done();
    })

    it('should sign in a user if they provide the correct response to their security question, and provide them with a token', async (done) => {
        let correctAnswer = await request.post('/authentication/checkSecurityAnswer').send({ email_address, security_answer: 'Blue' })
        expect(correctAnswer.status).toBe(200);
        expect(correctAnswer.text).toBe('Signing you in now.  Please make sure to update your password.')
        done();
    })

})

describe('signing out a user', () => {
    beforeAll(async () => {
        await users.createUser(email_address, password, time_zone, security_question, security_answer);
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
    })

    it('should sign out a user and delete their session when they sign out', async (done) => {
        done();
    })

    it('should not allow a user who has signed out to make a request, without first signing back in', async (done) => {
        done();
    })

})