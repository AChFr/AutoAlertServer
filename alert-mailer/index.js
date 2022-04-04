const CronJob = require('cron').CronJob
const { sendMail } = require('../config/transporter.config');
const transporter = require("../config/transporter.config")

const mailUser = (mail) => {
    transporter.sendMail({
        from: "imdbprojectteam@gmail.com",
        to: mail,
        subject: `Alerta!!!`,
        text: `esto es una alerta!!`,
        html: "<p>" + `esto es una alerta!!` + "</p>"
    })


}



var job = new CronJob('* * * * *', () => {
    // mailUser("amorosoperezoso@gmail.com")

}, null, true, 'America/Los_Angeles');
job.start();


