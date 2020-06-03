const axios = require('axios')
const url = 'http://api.tvmaze.com';

const apiRequests = {

    getDailySchedule: (year, month, day) => {
        let endpoint = `${url}/schedule?country=US&date=${year}-${month}-${day}`
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
                }
                return shows;
            })
            .catch(err => console.error(err))
    },

    searchForShow: (query) => {
        let endpoint = `${url}/search/shows?q=${query}`;
        axios.get(endpoint)
            .then(function (response) {
                let data = response.data;
                return data;
            }).catch(err => console.error(err))
    },

    getShowEpisodes: (tvmazeId) => {
        let endpoint = `${url}/shows/${tvmazeId}/episodes`;
        axios.get(endpoint)
            .then(function (response) {
                let data = response.data;
                return data;
            }).catch(err => console.error(err))
    }

}

module.exports = apiRequests