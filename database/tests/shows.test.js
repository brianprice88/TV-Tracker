const shows = require('../queries/shows');

describe('shows table queries', () => {

    let id = 1;
    let showName = 'not a real show';
    let episodes = [1.1, 1.2];

    beforeEach(async () => {
        await shows.deleteShow(id)
    })

    afterAll(async () => {
        await shows.deleteShow(id)
    })

    it('should not find a show that doesn\'t exist', async (done) => {
        let nonexistentShow = await shows.searchForShow(id);
        expect(nonexistentShow.rows.length).toBe(0);
        done()
    })

    it('should add a new show', async (done) => {
        let newShow = await shows.addNewShow(id, showName, episodes);
        expect(newShow.rowCount).toBe(1)
        done()
    })

    it('should not add a show that already exists', async (done) => {
        let newShow = await shows.addNewShow(id, showName, episodes);
        await expect(shows.addNewShow(id, showName, episodes))
            .rejects
            .toThrow()
        done()
    })

    it('should find a show that has been added to the table', async (done) => {
        let newShow = await shows.addNewShow(id, showName, episodes);
        let existentShow = await shows.searchForShow(id)
        expect(existentShow.rows[0].name).toBe(showName);
        done()
    })

    it('should add a new episode to an existing show', async (done) => {
        let newShow = await shows.addNewShow(id, showName, episodes);
        let newEpisode = await shows.addNewEpisode(id, 1.3);
        let existentShow = await shows.searchForShow(id)
        expect(existentShow.rows[0].episodes[2]).toBe(1.3);
        done()
    })

})