const gmail = require('../../nodemailerConfig');
const nodemailer = require('nodemailer');

const nodemailerFunctions = {

    notifyUsers: function (userToNotify, episodeInfo) {
        let email = userToNotify;

        let message =
            `Hi ${email},
        Here are the shows airing today that you wanted to be notified about:    
        `

        for (var i = 0; i < episodeInfo.length; i++) {
            let { showName, episodeName, season, number, time, summary, network } = episodeInfo[i];
            message += `${showName.toUpperCase()} season ${season} episode ${number} '${episodeName.toUpperCase()}' airs on ${network} at ${time}.`;
            if (summary !== null) {
                summary = summary.slice(3, -4) // get rid of the <p> tags
                message += `'${summary}'`
            }
            message += '\n'
        }

        message += '* Please note that all show times are EST and may vary by location. *'

        let user = gmail.user;
        let pass = gmail.password;

        if (process.env.NODE_ENV === 'production') { // for deployment, use the environment variables on Heroku
            user = process.env.user;
            pass = process.env.password
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
            }
        });


        const mailOptions = {
            from: user,
            to: email,
            subject: `New episode notification from TV Tracker`,
            text: message
        };

        transporter.sendMail(mailOptions)

    },

    sendUserFeedback: function (req, res) {
        let { email_address, message } = req.body
        let user = gmail.user;
        let pass = gmail.password;

        if (process.env.NODE_ENV === 'production') { // for deployment, use the environment variables on Heroku
            user = process.env.user;
            pass = process.env.password
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
            }
        });

        const mailOptions = {
            from: email_address,
            to: gmail.user,
            subject: `From ${email_address}`,
            text: message
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) { res.status(400).send(err) }
            else { res.status(200).send({ message: `Message sent successfully!` }) }
        })
    }


}

module.exports = nodemailerFunctions