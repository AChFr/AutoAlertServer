const CronJob = require('cron').CronJob
const transporter = require("./transporter.config")

let counter = 0


const mailUser = (address) => {
    transporter.sendMail({
        from: "imdbprojectteam@gmail.com",
        to: address,
        subject: `Alerta!!!`,
        text: `esto es una alerta!! y el contador es ===>>> ${counter}`,
        html: "<p>" + `esto es una alerta!!` + "</p>"
    })
}



var job = new CronJob('00 * * * *', () => {
    let mail = "amorosoperezoso@gmail.com"
    counter++
    mailUser(mail)

}, null, true, 'America/Los_Angeles')

job.start();