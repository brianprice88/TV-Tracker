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
let time_zone = 'EST';
let security_question = 'What_is_your_favorite_color?';
let security_answer = 'blue';

let email_address2 = 'anotherUser@gmail.com';
let password2 = 'password';
let time_zone2 = 'PST';
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
        await users.createUser(email_address, password, time_zone, security_question, security_answer);
        await users.createUser(email_address2, password2, time_zone2, security_question2, security_answer2);
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
    })

    afterAll(async () => {
        await users.deleteUser(email_address);
        await users.deleteUser(email_address2);
        await shows.deleteShow(tvmaze_id);
        await shows.deleteShow(tvmaze_id2);
    })


    it('should be able to fetch the daily schedule from tvmazeapi', async (done) => {
        let schedule = await getDailySchedule();
        expect(schedule.length).toBeGreaterThan(20)
        done()
    })



})