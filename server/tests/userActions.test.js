const supertest = require('supertest');
const app = require('../index.js');
const request = supertest(app);
const users = require('../../database/queries/users');
const shows = require('../../database/queries/shows')
const usersShows = require('../../database/queries/users_shows')

let email_address = 'testUser@gmail.com';
let password = 'password';
let time_zone = 'EST';
let security_question = 'What_is_your_favorite_color?';
let security_answer = 'blue';
let session = 'fakeSession'

describe('user actions', () => {
    beforeAll(async () => {
        await users.createUser(email_address, password, time_zone, security_question, security_answer);
        await users.createSession(email_address, session)
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
    })

    it('should not perform the user request without a valid session token', async (done) => {
        let invalidQuery = await request.post('/userAction/showSearch').send({ email_address, session: 'invalidSession', search: "Game of Thrones" })
        expect(invalidQuery.body.message).toBe('Invalid session')
        done()
    })

    it('should let a user search for shows based on a complete name', async (done) => {
        let searchQuery = await request.post('/userAction/showSearch').send({ email_address, session, search: "Game of Thrones" })
        let matches = searchQuery.body.results;
        expect(matches.length).toBeGreaterThanOrEqual(1);
        let showNames = matches.map(show => show.name)
        expect(showNames).toContain("Game of Thrones")
        done()
    })

    it('should let a user search for shows with only a partial result', async (done) => {
        let searchQuery = await request.post('/userAction/showSearch').send({ email_address, session, search: "break" })
        let matches = searchQuery.body.results;
        expect(matches.length).toBeGreaterThanOrEqual(1);
        let showNames = matches.map(show => show.name)
        expect(showNames).toContain("Prison Break")
        done()
    })

})