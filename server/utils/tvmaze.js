const axios = require('axios')
const url = 'http://api.tvmaze.com';

const apiRequests = {

    getDailySchedule: (year, month, day) => {
        let endpoint = `${url}/schedule?country=US&date=${year}-${month}-${day}` // only for US schedule (for now, at least)
        axios.get(endpoint)
            .then(function (response) {
                let data = response.data;
                let shows = [];
                for (var i = 0; i < data.length; i++) {
                    let show = data[i];
                    let showInfo = {};
                    showInfo.showtvmazeId = show.show.id;
                    showInfo.showName = show.show.name;
                    showInfo.episodeName = show.name;
                    showInfo.season = show.season;
                    showInfo.number = show.number;
                    showInfo.time = show.airtime;
                    showInfo.summary = show.summary;
                    showInfo.network = show.show.network.name;
                    shows.push(showInfo)
                }
                return shows;
            })
            .catch(err => console.error(err))
    },

    searchbyShowName: (query) => {
        let endpoint = `${url}/search/shows?q=${query}`;
        return new Promise((resolve, reject) =>
        axios.get(endpoint)
            .then(function (response) {
                let data = response.data;
                let availShows = data.filter(show => show.show.summary !== null) // includes popular non-English language shows like on Netflix
                let shows = [];
                for (var i = 0; i < availShows.length; i++) {
                    let show = availShows[i];
                    let showInfo = {};
                    showInfo.tvmazeId = show.show.id;
                    showInfo.name = show.show.name;
                    showInfo.network = show.show.network.name;
                    showInfo.summary = show.show.summary;
                    shows.push(showInfo)
                }
                resolve(shows);
            }).catch(err => reject(err))
        )},

    getShowEpisodes: (tvmazeId) => {
        let endpoint = `${url}/shows/${tvmazeId}/episodes`;
        axios.get(endpoint)
            .then(function (response) {
                let data = response.data;
                let episodes = [];
                for (var i = 0; i < data.length; i++) {
                    let episode = data[i];
                    let episodeInfo = {};
                    episodeInfo.season = episode.season;
                    episodeInfo.number = episode.number;
                    episodes.push(episodeInfo)
                }
                return episodes;
            }).catch(err => console.error(err))
    }

}

module.exports = apiRequests