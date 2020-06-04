const axios = require('axios')
const url = 'http://api.tvmaze.com';

const apiRequests = {

    getDailySchedule: (year, month, day) => {
        let endpoint = `${url}/schedule?country=US&date=${year}-${month}-${day}` // only for US schedule (for now, at least)
        return new Promise((resolve, reject) =>
            axios.get(endpoint)
                .then(function (response) {
                    let data = response.data;
                    let shows = data.map(function (show) {
                        let showInfo = {};
                        showInfo.showtvmazeId = show.show.id;
                        showInfo.showName = show.show.name;
                        showInfo.episodeName = show.name;
                        showInfo.season = show.season;
                        showInfo.number = show.number;
                        showInfo.time = show.airtime;
                        showInfo.summary = show.summary;
                        showInfo.network = show.show.network.name;
                        return showInfo
                    })
                    resolve(shows);
                })
                .catch(err => reject(err))
        )
    },

    searchbyShowName: (query) => {
        let endpoint = `${url}/search/shows?q=${query}`;
        return new Promise((resolve, reject) =>
            axios.get(endpoint)
                .then(function (response) {
                    let data = response.data;
                    let showsData = data.map(function (show) {
                        let showInfo = {};
                        showInfo.tvmazeId = show.show.id;
                        showInfo.name = show.show.name;
                        showInfo.summary = show.show.summary;
                        return showInfo;
                    })
                    resolve(showsData);
                }).catch(err => reject(err))
        )
    },

    queryForShowEpisodes: (tvmazeId) => {
        let endpoint = `${url}/shows/${tvmazeId}/episodes`;
        return new Promise((resolve, reject) =>
            axios.get(endpoint)
                .then(function (response) {
                    let data = response.data;
                    let episodeData = data.map(function (episode) {
                        season = episode.season;
                        number = episode.number;
                        return `${season.toString()}.${number.toString()}`
                    })
                    resolve(episodeData);
                }).catch(err => reject(err))
        )
    },

    queryForEpisodeInfo: (tvmazeId, season, number) => {
        let endpoint = `${url}/shows/${tvmazeId}/episodebynumber?season=${season}&number=${number}`;
        return new Promise((resolve, reject) =>
            axios.get(endpoint)
                .then(function (response) {
                    let episode = response.data;
                    let episodeInfo = {};
                    episodeInfo.name = episode.name;
                    episodeInfo.summary = episode.summary;
                    episodeInfo.airdate = episode.airdate;
                    resolve(episodeInfo);
                })
                .catch(err => reject(err))
        )
    }

}

module.exports = apiRequests