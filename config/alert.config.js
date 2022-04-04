const express = require("express")
const CronJob = require('cron').CronJob
const Alert = require("../models/Alert.model")
const Vehicle = require("../models/Vehicle.model")
const User = require("../models/User.model")
const transporter = require("./transporter.config")

let counter = 0


const mailUser = (address) => {
    transporter.sendMail({
        from: "imdbprojectteam@gmail.com",
        to: address,
        subject: `Alerta!!!`,
        text: `esto es una alerta!! y el contador es ===>>> ${counter} y la hora es ${new Date
            } `,
        html: "<p>" + `esto es una alerta!!  y el contador es ===>>> ${counter} y la hora es ${new Date
            }` + "</p>"
    })
}



var job = new CronJob('*/10 * * * *', () => {
    let mail = "troysoviet@gmail.com"
    counter++
    mailUser(mail)

}, null, true, 'America/Los_Angeles')

job.start();