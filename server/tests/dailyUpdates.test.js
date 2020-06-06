const supertest = require('supertest');
const app = require('../index.js');
const request = supertest(app);
const dailyUpdates = require('../utils/dailyUpdates')
const { getDailySchedule } = require('../utils/tvmaze')

const users = require('../../database/queries/users');
const shows = require('../../database/queries/shows')
const usersShows = require('../../database/queries/users_shows')


let email_address = 'testUser@gmail.com';
let password = 'password';
let security_question = 'What_is_your_favorite_color?';
let security_answer = 'blue';

let email_address2 = 'anotherUser@gmail.com';
let password2 = 'password';
let security_question2 = 'What_is_your_favorite_color?';
let security_answer2 = 'blue';

let name = 'Fake Show'
let tvmaze_id = 0;
let episodes = ['1.1', '1.2', '1.3'];

let name2 = 'The Outsider';
let tvmaze_id2 = 39956;
let episodes2 = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9']; // all but the last episode

let userId;
let showId;

let user2Id;
let show2Id;

describe('daily updates', () => {
    beforeAll(async () => {
        await users.createUser(email_address, password, security_question, security_answer);
        await users.createUser(email_address2, password2, security_question2, security_answer2);
        await shows.addNewShow(tvmaze_id, name, episodes)
        await shows.addNewShow(tvmaze_id2, name2, episodes2)
        userId = await users.getUser(email_address)
        userId = userId.rows[0].id;
        showId = await shows.searchForShow(tvmaze_id);
        showId = showId.rows[0].id;
        user2Id = await users.getUser(email_address2)
        user2Id = user2Id.rows[0].id;
        show2Id = await shows.searchForShow(tvmaze_id2);
        show2Id = show2Id.rows[0].id;
        await usersShows.addShowToUserList(userId, showId, true)
        await usersShows.addShowToUserList(userId, show2Id, true)
        await usersShows.addShowToUserList(user2Id, showId, false)
        await usersShows.addShowToUserList(user2Id, show2Id, true)
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
        await users.deleteUser(email_address2);
        await shows.deleteShow(tvmaze_id);
        await shows.deleteShow(tvmaze_id2);
        await usersShows.removeUser(userId);
        await usersShows.removeUser(user2Id)

    })


    it('should be able to fetch the daily schedule from tvmazeapi', async (done) => {
        let schedule = await getDailySchedule();
        expect(schedule.length).toBeGreaterThan(1)
        done()
    })

    it('should next determine if a show is in the shows database', async (done) => {
        let nonexistingShow = await dailyUpdates.checkDatabaseForShow(123)
        let existingShow = await dailyUpdates.checkDatabaseForShow(0)
        expect(nonexistingShow.length).toBe(0)
        expect(existingShow.length).toBe(1)
        done()
    })

    it('should add the latest episode number for existing shows', async (done) => {
        let existingShow = await dailyUpdates.checkDatabaseForShow(39956)
        expect(existingShow[0].episodes.length).toBe(9)
        let addEpisode = await dailyUpdates.addNewEpisodeToDatabase(39956, '1.10')
        let updatedShow = await dailyUpdates.checkDatabaseForShow(39956)
        expect(updatedShow[0].episodes.length).toBe(10)
        done()
    })

    it('should find which user(s) to notify about shows that exist in the database', async (done) => {
        let show1Notifications = await dailyUpdates.getUsersToNofify(showId);
        let show2Notifications = await dailyUpdates.getUsersToNofify(show2Id);
        expect(show1Notifications.length).toBe(1)
        expect(show1Notifications[0].user_id).toBe(userId)
        expect(show2Notifications.length).toBe(2)
        expect(show2Notifications[0].user_id).toBe(userId)
        expect(show2Notifications[1].user_id).toBe(user2Id)
        done();
    })

    it('should then get the corresponding email address preference for the given user(s)', async (done) => {
        let user1Contact = await dailyUpdates.getUserEmail(userId);
        let user2Contact = await dailyUpdates.getUserEmail(user2Id);
        expect(user1Contact[0].email_address).toBe(email_address)
        expect(user2Contact[0].email_address).toBe(email_address2)
        done()
    })

    it('should format the show time correctly', async(done) => {
        let showTime = dailyUpdates.formatTime('22:30');
        let show2Time = dailyUpdates.formatTime('00:35');
        let show3Time = dailyUpdates.formatTime('12:00');
        let show4Time = dailyUpdates.formatTime('8:30');
        let show5Time = dailyUpdates.formatTime('21:00');
        expect(showTime).toBe('10:30 PM')
        expect(show2Time).toBe('12:35 AM')
        expect(show3Time).toBe('12:00 PM')
        expect(show4Time).toBe('8:30 AM')
        expect(show5Time).toBe('9:00 PM')
        done();
    })

    it('should be able to accomplish all of the above functions, and create a list of shows to notify each user about', async (done) => {
        let update = await dailyUpdates.updateAll();
        done();
    })

})