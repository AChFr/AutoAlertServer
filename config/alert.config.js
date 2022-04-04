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
        text: `esto es una alerta!! y el contador es ===>>> ${counter}`,
        html: "<p>" + `esto es una alerta!!  y el contador es ===>>> ${counter}` + "</p>"
    })
}



var job = new CronJob('0/5 00-23 01-31 01-12 0-6', () => {
    let mail = "amorosoperezoso@gmail.com"
    counter++
    mailUser(mail)

}, null, true, 'America/Los_Angeles')

job.start();