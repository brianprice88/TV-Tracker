const users_shows = require('../queries/users_shows');
const users = require('../queries/users');
const shows = require('../queries/shows');

describe('users_shows table queries', () => {

    let user1email = 'testUser@gmail.com';
    let user1pass = 'password';
    let user1time = 'EST';
    let user1question = 'What_is_your_favorite_color?';
    let user1answer = 'blue';

    let user2email = 'testUser2@gmail.com';
    let user2pass = 'password';
    let user2time = 'EST';
    let user2question = 'What_is_your_favorite_color?';
    let user2answer = 'blue';

    let show1TVMazeid = 1;
    let show1Name = 'not a real show';
    let show1episodes = [1.1, 1.2];

    let show2TVMazeid = 2;
    let show2Name = 'also not a real show';
    let show2episodes = [1.1, 1.2];

    beforeAll(async () => {
        await users.createUser(user1email, user1pass, user1time, user1question, user1answer);
        await users.createUser(user2email, user2pass, user2time, user2question, user2answer);
        await shows.addNewShow(show1TVMazeid, show1Name, show1episodes)
        await shows.addNewShow(show2TVMazeid, show2Name, show2episodes)
    })

    afterEach(async () => {
        let user1 = await users.getUser(user1email);
        let user1id = user1.rows[0].id;
        let user2 = await users.getUser(user2email);
        let user2id = user2.rows[0].id;
        await users_shows.removeUser(user1id)
        await users_shows.removeUser(user2id)
    })

    afterAll(async () => {
        await users.deleteUser(user1email, user1pass, user1time, user1question, user1answer);
        await users.deleteUser(user2email, user2pass, user2time, user2question, user2answer);
        await shows.deleteShow(show1TVMazeid)
        await shows.deleteShow(show2TVMazeid)
    })

    it('should be able to add a new show to a user\'s list', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        expect(newRecord.rowCount).toBe(1);
        done()
    })

    it('should not add the same record to a user\'s list', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        await expect(users_shows.addShowToUserList(user1id, show1id, true))
            .rejects
            .toThrow()
        let recordSearch = await users_shows.findShowsForUser(user1id);
        expect(recordSearch.rowCount).toBe(1);
        done()
    })

    it('should be able to find all shows on a user\'s list', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let show2 = await shows.searchForShow(show2TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let show2id = show2.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        let newRecord2 = await users_shows.addShowToUserList(user1id, show2id, true);
        let recordSearch = await users_shows.findShowsForUser(user1id);
        expect(recordSearch.rows.length).toBe(2);
        expect(recordSearch.rows[0].show_id).toBe(show1id)
        expect(recordSearch.rows[1].show_id).toBe(show2id)
        done()
    })

    it('should be able to find all users who want to be notified about a given show', async (done) => {
        let user1 = await users.getUser(user1email);
        let user2 = await users.getUser(user2email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let user1id = user1.rows[0].id;
        let user2id = user2.rows[0].id;
        let show1id = show1.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        let newRecord2 = await users_shows.addShowToUserList(user2id, show1id, true);
        let recordSearch = await users_shows.findUsersToNotifyForShow(show1id);
        expect(recordSearch.rows.length).toBe(2);
        expect(recordSearch.rows[0].user_id).toBe(user1id)
        expect(recordSearch.rows[1].user_id).toBe(user2id)
        done()
    })

    it('should be able to add and remove the episodes a user has watched of a show', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        let watchedEpisode = await users_shows.addEpisodeWatched(user1id, show1id, 1.1);
        let recordSearch = await users_shows.findShowsForUser(user1id);
        expect(recordSearch.rows[0].episodes_watched[0]).toBe(1.1);
        let didntWatchEpisode = await users_shows.removeEpisodeWatched(user1id, show1id, 1.1);
        let reSearch = await users_shows.findShowsForUser(user1id);
        expect(reSearch.rows[0].episodes_watched.length).toBe(0)
        done()
    })

    it('should be able to notify whether a user wants to be notified about a show on their list', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        let unNotify = await users_shows.toggleShowNotification(user1id, show1id);
        let usersToNotify = await users_shows.findUsersToNotifyForShow(show1id);
        expect(usersToNotify.rows.length).toBe(0);
        let notify = await users_shows.toggleShowNotification(user1id, show1id);
        let recheckUsersToNotify = await users_shows.findUsersToNotifyForShow(show1id);
        expect(recheckUsersToNotify.rows[0].user_id).toBe(user1id);
        done()
    })

    it('should let a user remove a show from their list', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let show2 = await shows.searchForShow(show2TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let show2id = show2.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        let newRecord2 = await users_shows.addShowToUserList(user1id, show2id, true);
        let removeShow = await users_shows.removeShowFromUserList(user1id, show1id);
        let userShows = await users_shows.findShowsForUser(user1id);
        expect(userShows.rows.length).toBe(1);
        expect(userShows.rows[0].show_id).toBe(show2id)
        let showUsers = await users_shows.findUsersToNotifyForShow(show1id);
        expect(showUsers.rows.length).toBe(0)
        done()
    })

    it('should delete a user from the table', async (done) => {
        let user1 = await users.getUser(user1email);
        let show1 = await shows.searchForShow(show1TVMazeid);
        let show2 = await shows.searchForShow(show2TVMazeid);
        let user1id = user1.rows[0].id;
        let show1id = show1.rows[0].id;
        let show2id = show2.rows[0].id;
        let newRecord = await users_shows.addShowToUserList(user1id, show1id, true);
        let newRecord2 = await users_shows.addShowToUserList(user1id, show2id, true);
        let removeUser = await users.deleteUser(user1email);
        let showUsers = await users_shows.findUsersToNotifyForShow(show1id);
        let show2Users = await users_shows.findUsersToNotifyForShow(show2id);
        expect(showUsers.rows.length).toBe(0);
        expect(show2Users.rows.length).toBe(0);
        await users.createUser(user1email, user1pass, user1time, user1question, user1answer);
        done();
    })

})