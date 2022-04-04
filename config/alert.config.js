const CronJob = require('cron').CronJob
const transporter = require("./transporter.config")



let counter = 0


const mailUser = (mail) => {
    transporter.sendMail({
        from: "imdbprojectteam@gmail.com",
        to: mail,
        subject: `Alerta!!!`,
        text: `esto es una alerta!! y el contador es ===>>> ${counter}`,
        html: "<p>" + `esto es una alerta!!` + "</p>"
    })
}



var job = new CronJob('15 * * * *', () => {
    counter++
    mailUser("amorosoperezoso@gmail.com")

}, null, true, 'America/Los_Angeles');
job.start();


