const supertest = require('supertest');
const app = require('../index.js');
const request = supertest(app);
const users = require('../../database/queries/users');
const shows = require('../../database/queries/shows')
const usersShows = require('../../database/queries/users_shows')
const { hashPassword } = require('../utils/hashFunctions')

let email_address = 'testUser@gmail.com';
let password = hashPassword('password');
let security_question = 'What_is_your_favorite_color?';
let security_answer = 'blue';
let session = 'fakeSession';

let name = 'Fake Show'
let tvmaze_id = 0;
let episodes = ['1.1', '1.2', '1.3'];

let userId;
let showId;

describe('user actions', () => {
    beforeAll(async () => {
        await users.createUser(email_address, password, security_question, security_answer);
        await users.createSession(email_address, session)
        await shows.addNewShow(tvmaze_id, name, episodes)
        userId = await users.getUser(email_address)
        userId = userId.rows[0].id;
        showId = await shows.searchForShow(tvmaze_id);
        showId = showId.rows[0].id;
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
        await shows.deleteShow(tvmaze_id);
        await shows.deleteShow(82)
    })

    it('should not perform the user request without a valid session token', async (done) => {
        let invalidQuery = await request.post('/userAction/showSearch').send({ email_address, session: 'invalidSession', search: "Breaking Bad" })
        expect(invalidQuery.body.message).toBe('Invalid session')
        done()
    })

    it('should let a user search for shows based on an exact match', async (done) => {
        let searchQuery = await request.post('/userAction/showSearch').send({ email_address, session, search: "Breaking Bad" })
        let matches = searchQuery.body.results;
        expect(matches.length).toBeGreaterThanOrEqual(1);
        let showNames = matches.map(show => show.name)
        expect(showNames).toContain("Breaking Bad")
        done()
    })

    it('should let a user search for shows without inputting an exact match', async (done) => {
        let searchQuery = await request.post('/userAction/showSearch').send({ email_address, session, search: "break" })
        let matches = searchQuery.body.results;
        expect(matches.length).toBeGreaterThanOrEqual(1);
        let showNames = matches.map(show => show.name)
        expect(showNames).toContain("Prison Break")
        done()
    })

    it('should upon receiving a user request to add a show to their list, if that show is already in the database, add it to their list and send them the episodes available', async (done) => {
        let userRequest = await request.post('/userAction/addShowToList').send({ email_address, session, name, tvmaze_id })
        let showEpisodes = await shows.searchForShow(tvmaze_id);
        let userShowList = await usersShows.findShowsForUser(userId);
        expect(userShowList.rows[0].show_id).toBe(showId)
        expect(userRequest.body.episodes).toStrictEqual(showEpisodes.rows[0].episodes);
        done();
    })

    it('should upon receiving a user request to add a show to their list, if that show is not in the database, get it from tvmaze api then add to the database and the user list, then send them the episodes available', async (done) => {
        let userRequest = await request.post('/userAction/addShowToList').send({ email_address, session, name: "Game of Thrones", tvmaze_id: 82 })
        let showEpisodes = await shows.searchForShow(82);
        expect(showEpisodes.rows[0].name).toBe('Game of Thrones')
        expect(showEpisodes.rows[0].tvmaze_id).toBe(82)
        expect(showEpisodes.rows[0].episodes.length).toBe(73) // # of Game of Thrones episodes
        let showId = showEpisodes.rows[0].id;
        let userShowList = await usersShows.findShowsForUser(userId);
        let userShowIDs = userShowList.rows.map(show => show.show_id);
        expect(userShowIDs).toContain(showId)
        expect(userRequest.body.episodes).toStrictEqual(showEpisodes.rows[0].episodes)
        done();
    })

    it('should let a user get more information about a specific episode of a show on their list', async (done) => {
        let userRequest = await request.post('/userAction/getEpisodeInfo').send({ email_address, session, tvmaze_id: 82, season: 1, number: 5 })
        expect(userRequest.body.episodeInfo.name).toBe("The Wolf and the Lion")
        done();
    })

    it('should let a user add or remove an episode to their list of episodes watched', async (done) => {
        let addEpisode = await request.post('/userAction/updateEpisodeList').send({ email_address, session, tvmaze_id: 82, addEpisode: true, episode: '1.1' })
        expect(addEpisode.body.tvmaze_id).toBe(82)
        expect(addEpisode.body.episode).toBe('1.1');
        let showList = await usersShows.findShowsForUser(userId);
        let removeEpisode = await request.post('/userAction/updateEpisodeList').send({ email_address, session, tvmaze_id: 82, addEpisode: false, episode: '1.1' })
        let updatedShowList = await usersShows.findShowsForUser(userId)
        expect(showList.rows[1].episodes_watched.length - updatedShowList.rows[1].episodes_watched.length).toBe(1)
        done();
    })

    it('should let a user toggle whether they want to be notified about a new episode of a show on their list', async (done) => {
        let showId = await shows.searchForShow(82)
        showId = showId.rows[0].id
        let showUsersListBefore = await usersShows.findUsersToNotifyForShow(showId);
        let userRequest = await request.post('/userAction/toggleNotification').send({ email_address, session, tvmaze_id: 82 })
        expect(userRequest.body.tvmaze_id).toBe(82);        
        let showUsersListAfter = await usersShows.findUsersToNotifyForShow(showId);
        expect(Math.abs(showUsersListBefore.rows.length - showUsersListAfter.rows.length)).toBe(1)
        done();
    })

    it('should let a user remove a show from their list', async (done) => {
        let userShowListBefore = await usersShows.findShowsForUser(userId);
        let userRequest = await request.post('/userAction/removeShowFromList').send({ email_address, session, tvmaze_id: 82 })
        expect(userRequest.body.tvmaze_id).toBe(82);
        let userShowListAfter = await usersShows.findShowsForUser(userId);
        expect(userShowListBefore.rows.length - userShowListAfter.rows.length).toBe(1)
        done();
    })

    it('should let a user update their email address', async (done) => {
        let userRequest = await request.post('/userAction/updateInfo').send({ email_address, session, field: 'email', update: 'mynewemail@gmail.com' });
        expect(userRequest.body.field).toBe('email');
        let newEmail = await users.getUser('mynewemail@gmail.com');
        expect(newEmail.rows[0].session).toBe(session)
        let oldEmail = await users.getUser(email_address)
        expect(oldEmail.rows.length).toBe(0)
        let reset = await request.post('/userAction/updateInfo').send({ email_address: 'mynewemail@gmail.com', session, field: 'email', update: 'testUser@gmail.com' });
        let originalEmail = await users.getUser('testUser@gmail.com');
        let updatedEmail = await users.getUser('mynewemail@gmail.com');
        expect(updatedEmail.rows.length).toBe(0)
        expect(originalEmail.rows[0].session).toBe(session)
        done();
    })

    it('should let a user update their password', async (done) => {
        let userRequest = await request.post('/userAction/updateInfo').send({ email_address, session, field: 'password', update: 'newPassword' })
        expect(userRequest.body.field).toBe('password');
        let oldPassword = await request.post('/authentication/signIn').send({ email_address, password: 'password' })
        expect(oldPassword.body.message).toBe('Invalid password')
        let newPassword = await request.post('/authentication/signIn').send({ email_address, password: 'newPassword' })
        expect(newPassword.body.user.session).toBeTruthy()
        expect(newPassword.body.shows).toBeTruthy();
        done();
    })

    // it('should let a user send feedback about the site', async (done) => {
    //     let newSession = await users.getUser(email_address); // because the previous test signed in and created a new session
    //     newSession = newSession.rows[0].session;
    //     let userFeedback = await request.post('/userAction/sendUserFeedback').send({ email_address, session: newSession, message: "This site is awesome!" })
    //     expect(userFeedback.body.message).toBe('Message sent successfully!')
    //     done();
    // })

    it('should let a user delete their account', async (done) => {
        let newSession = await users.getUser(email_address); // because the previous test signed in and created a new session
        newSession = newSession.rows[0].session;
        let userRequest = await request.post('/userAction/deleteAccount').send({ email_address, session: newSession })
        expect(userRequest.body.message).toBe('Account deleted')
        let userTableSearch = await users.getUser(email_address)
        let usersShowsTableSearch = await usersShows.findShowsForUser(userId)
        expect(userTableSearch.rows.length).toBe(0)
        expect(usersShowsTableSearch.rows.length).toBe(0)
        done();
    })

})