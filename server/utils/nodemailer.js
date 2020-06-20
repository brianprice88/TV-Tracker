const nodemailer = require('nodemailer');

const nodemailerFunctions = {

    notifyUsers: function (userToNotify, episodeInfo) {
        let email = userToNotify;

        let htmlEmail =
            `<div style="text-align: left, font-size: 24px"><p>Hi ${email},</p>
        <ul style="padding: 0">Here are the shows airing today that you wanted to be notified about:</ul>    
        `

        for (var i = 0; i < episodeInfo.length; i++) {
            let { showName, episodeName, season, number, time, summary, network } = episodeInfo[i];
            if (summary !== null) {
                summary = summary.slice(3, -4) // get rid of the <p> tags
                htmlEmail += `<li><span style="font-weight: bold">${showName.toUpperCase()}</span> season ${season} episode ${number} '<span style="font-weight: bold">${episodeName.toUpperCase()}</span>' airs on ${network} at ${time}.  '<span style="font-style: italic">${summary}</span>'</li><br/>`;
            } else {
                htmlEmail += `<li><span style="font-weight: bold">${showName.toUpperCase()}</span> season ${season} episode ${number} '<span style="font-weight: bold">${episodeName.toUpperCase()}</span>' airs on ${network} at ${time}.</li><br/>`
            }
        }

        htmlEmail += '<p style="text-decoration: underline">Please note that all show times are EST and may vary by location.</p></div>'

        let user = process.env.GMAILUSER;
        let pass = process.env.GMAILPASSWORD;

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
            subject: `Episode notification from TV Tracker`,
            html: htmlEmail
        };

        transporter.sendMail(mailOptions)

    },

    sendUserFeedback: function (req, res) {
        let { email_address, message } = req.body
        let user = process.env.GMAILUSER;
        let pass = process.env.GMAILPASSWORD;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
            }
        });

        const mailOptions = {
            from: email_address,
            to: user,
            subject: `From ${email_address}`,
            text: message
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) { res.status(404).send(err) }
            else { res.send({ message: `Message sent successfully!` }) }
        })
    }


}

module.exports = nodemailerFunctions