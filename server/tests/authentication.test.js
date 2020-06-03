const supertest = require('supertest');
const app = require('../index.js');
const request = supertest(app);
const users = require('../../database/queries/users');
const usersShows = require('../../database/queries/users_shows')

let email_address = 'testUser@gmail.com';
let password = 'password';
let time_zone = 'EST';
let security_question = 'What_is_your_favorite_color?';
let security_answer = 'blue';
let session = 'fakeSession'

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
        expect(signup.body.message).toBe('Account created successfully.  You can now sign in!')
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
        expect(signin.body.message).toBe('Invalid email address')
        done();
    })

    it('should not sign in a user who inputs an incorrect password', async (done) => {
        let signin = await request.post('/authentication/signIn').send({ email_address, password: 'fakePassword' })
        expect(signin.status).toBe(404)
        expect(signin.body.message).toBe('Invalid password')
        done();
    })

    it('should sign in a user who inputs a correct password, and provide them with a session token as well as their list of shows', async (done) => {
        let signin = await request.post('/authentication/signIn').send({ email_address, password: 'password' })
        let userInfo = await users.getUser(email_address);
        let userShows = await usersShows.findShowsForUser(userInfo.rows[0].id)
        expect(signin.body.session).toBe(userInfo.rows[0].session)
        expect(signin.body.shows).toStrictEqual(userShows.rows)
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
        expect(failedAttempt.body.message).toBe('That answer is incorrect')
        done();
    })

    it('should sign in a user if they provide the correct response to their security question, and provide them with a token and their list of shows', async (done) => {
        let correctAnswer = await request.post('/authentication/checkSecurityAnswer').send({ email_address, security_answer: 'Blue' })
        let userInfo = await users.getUser(email_address);
        let userShows = await usersShows.findShowsForUser(userInfo.rows[0].id)
        expect(correctAnswer.body.message).toBe('Signing you in now.  Please make sure to update your password.')
        expect(correctAnswer.body.session).toBe(userInfo.rows[0].session)
        expect(correctAnswer.body.shows).toStrictEqual(userShows.rows)
        done();
    })

})

describe('signing out a user', () => {
    beforeAll(async () => {
        await users.createUser(email_address, password, time_zone, security_question, security_answer);
        await users.createSession(email_address, session)
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
    })

    it('should sign out a user and delete their session when they sign out', async (done) => {
        let deleteSession = await request.post('/authentication/signOut').send({ email_address, session })
        expect(deleteSession.body.message).toBe('You are now signed out')
        done();
    })

    it('should not allow a user who has signed out to make a request, without first signing back in', async (done) => {
        let signoutAgain = await request.post('/authentication/signOut').send({ email_address, session });
        expect(signoutAgain.body.message).toBe('Invalid session')
        done();
    })

})