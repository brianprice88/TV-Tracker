const users = require('../queries/users')

describe('user table queries', () => {

    let email = 'testUser@gmail.com';
    let pass = 'password';
    let time = 'Eastern';
    let question = 'What_is_your_favorite_color?';
    let answer = 'blue';

    beforeEach(async () => {
        await users.deleteUser(email);
        await users.deleteUser('newEmail@gmail.com');
    })

    afterAll(async () => {
        await users.deleteUser(email);
        await users.deleteUser('newEmail@gmail.com');
    })

    it('should not find a user who doesn\'t exist', async (done) => {
        let nonexistentUser = await users.getUser('fakeEmail@gmail.com');
        expect(nonexistentUser.rows.length).toBe(0);
        done()
    })

    it('should create a new user when given the user\'s information', async (done) => {
        let create = await users.createUser(email, pass, time, question, answer);
        let user = await users.getUser(email)
        expect(user.rows[0].email_address).toBe(email)
        let id = user.rows[0].id;
        let getUserById = await users.findUserById(id)
        expect(user.rows[0].email_address).toBe(email);
        done();
    })

    it('should not create a new user if that user email already exists', async (done) => {
        let create = await users.createUser(email, pass, time, question, answer);
        await expect(users.createUser(email, pass, time, question, answer))
            .rejects
            .toThrow()
        let user = await users.getUser(email);
        expect(user.rows.length).toBe(1)
        done()
    })

    it('should update a user\'s information correctly', async (done) => {
        let create = await users.createUser(email, pass, time, question, answer);
        let updateEmail = await users.editUserEmail(email, 'newEmail@gmail.com');
        let updatePassword = await users.editUserPassword('newEmail@gmail.com', 'newPassword');
        let updateTimezone = await users.editUserTimezone('newEmail@gmail.com', 'Pacific');
        let user = await users.getUser('newEmail@gmail.com');
        expect(user.rows[0].email_address).toBe('newEmail@gmail.com');
        expect(user.rows[0].password).toBe('newPassword');
        expect(user.rows[0].time_zone).toBe('Pacfici');
        let oldUser = await users.getUser(email);
        expect(oldUser.rows.length).toBe(0)
        done()
    })

    it('should delete a user given the user\'s information', async (done) => {
        let create = await users.createUser(email, pass, time, question, answer);
        let erase = await users.deleteUser(email);
        let user = await users.getUser(email);
        expect(user.rows.length).toBe(0)
        done();
    })

    it('should create a new user session', async (done) => {
        let create = await users.createUser(email, pass, time, question, answer);
        let newSession = await users.createSession(email, 'sessionToken')
        let getSession = await users.getSession(email)
        expect(getSession.rows[0].session).toBe('sessionToken')
        done();
    })

    it('should delete a user session', async (done) => {
        let create = await users.createUser(email, pass, time, question, answer);
        let newSession = await users.createSession(email, 'sessionToken')
        let deleteSession = await users.deleteSession(email)
        let getSession = await users.getSession(email)
        expect(getSession.rows[0].session).toBe(null)
        done();
    })

})