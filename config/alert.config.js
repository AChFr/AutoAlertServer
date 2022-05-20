const express = require("express")
const CronJob = require('cron').CronJob
const Alert = require("../models/Alert.model")
const Vehicle = require("../models/Vehicle.model")

const transporter = require("./transporter.config")

let nextAlert
let car

const checkAlerts = () => {


    Alert
        .find().populate("vehicle")
        .then(result => {
            let today = new Date
            result.forEach(elm => {

                if (elm.dueAt.toDateString() === today.toDateString()) {
                    mailUser(elm.vehicle._id)
                }
                nextAlert = elm.name
            })
        })
}


const mailUser = (vehicleId) => {
    Vehicle
        .findOne(vehicleId).populate("owner")
        .then(result => {

            car = result.name

            transporter.sendMail({
                from: "imdbprojectteam@gmail.com",
                to: result.owner.email,
                subject: `You have an impending ${nextAlert}!!`,
                text: `This is an email regarding your ${car}.You have an impending  ${nextAlert} due today! Dont forget to do it!`,
                html: "<p>" + `This is an email regarding your ${car}. You have an impending ${nextAlert} due today! Dnt forget to do it!` + "</p>"
            })
        })

}



const job = new CronJob('* * * * *', () => {

    checkAlerts()

}, null, true, 'America/Los_Angeles')


job.start();