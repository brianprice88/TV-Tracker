const { getDailySchedule } = require('./tvmaze.js')

const nodemailerFunctions = {

    notifyUsers: async function () {
    let year = (new Date().getFullYear()).toString();
    let month = ((new Date()).getMonth() + 1).toString();
    let day = ((new Date()).getDate()).toString();
    month = month.length === 1 ? '0' + month : month; // month/day need leading zeroes for api format
    day = day.length === 1 ? '0' + day : day;
    let dailySchedule = await getDailySchedule(year, month, day)
    console.log(dailySchedule)
}


}

module.exports = nodemailerFunctions