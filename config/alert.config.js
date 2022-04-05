const express = require("express")
const CronJob = require('cron').CronJob
const Alert = require("../models/Alert.model")
const Vehicle = require("../models/Vehicle.model")
const User = require("../models/User.model")
const transporter = require("./transporter.config")





const mailUser = (address) => {
    transporter.sendMail({
        from: "imdbprojectteam@gmail.com",
        to: address,
        subject: `Alerta!!!`,
        text: `esto es una alerta!! y el contador es ===>>> y la hora es ${new Date} `,
        html: "<p>" + `esto es una alerta!!  y el contador es ===>>> y la hora es ${new Date}` + "</p>"
    })
}



// let launchTime = new Date()

// setInterval(() => {
//     let currentTime = new Date()
//     let count = +currentTime - +launchTime
//     console.log(count)
// }, 1000)


let minutes = 0
let counter = 0

console.log(" l a u n c h  t i m e " + new Date())
console.log(" m i n u t e s " + minutes)
console.log(" c o u n t e r " + counter)
setInterval(() => {
    counter++
    if (counter === 60) {
        minutes++
        console.log(" m i n u t e s " + minutes)
        counter = 0
    }

    if (minutes >= 30) {
        mailUser("amorosoperezoso@gmail.com")
        console.log(" m a i l e d   a t  " + new Date())
        minutes = 0
        console.log("now is " + new Date())
    }
}, 1000)


//the proper way to do it is this, but since heroku has its own "CRON", you have to pay extra to be able to do this. 
// so I did it the "ugly" way. but its fee!!! ¯\_(ツ)_/¯


// var job = new CronJob('*/10 * * * *', () => {
//     let mail = "troysoviet@gmail.com"
//     counter++
//     mailUser(mail)

// }, null, true, 'America/Los_Angeles')

// job.start();