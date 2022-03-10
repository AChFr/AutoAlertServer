const express = require("express")
const router = require("express").Router();
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const Vehicle = require("../models/Vehicle.model")
const Alert = require("../models/Alert.model")


///////////////// C R E A T E  O N E /////////////////////////

router.post("/create", isAuthenticated, (req, res) => {

    Alert
        .create(req.body)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
})


////////////////// L I S T  A L L////////////////////////

router.get('/allAlerts', isAuthenticated, (req, res, next) => {

    let allPromises = []

    Vehicle
        .find({ owner: req.payload._id })
        .then(result => {
            result.forEach(elm => {
                allPromises.push(Alert.find({ vehicle: elm._id }).populate("vehicle"))
            })
            return Promise.all(allPromises)
        })
        .then(allAlerts => res.json(allAlerts.flat()))
        .catch(err => res.status(500).json(err))
})


///////// L I S T  A L E R T S  O F  O N E  V E H I C L E //////

router.get('/vehicle/:vehicle_id', isAuthenticated, (req, res, next) => {

    const { vehicle_id } = req.params

    Alert
        .find({ vehicle: vehicle_id }).sort({ dueAt: 1 })
        .populate("vehicle")
        .then(result => {

            console.log(result)
            res.json(result)
        }
        )
        .catch(err => res.status(500).json(err))
})
/////////// L I S T  O N E   ////////

router.get('/:alert_id', isAuthenticated, (req, res, next) => {

    const { alert_id } = req.params

    Alert
        .findById(alert_id)
        .then(result => res.json(result)) //result.data
        .catch(err => res.status(500).json(err))
})

///////////////// E D I T  O N E /////////////////////////

router.put('/:alert_id', isAuthenticated, (req, res, next) => {

    const { alert_id } = req.params

    Alert
        .findByIdAndUpdate(alert_id, req.body, { new: true })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))

})


/////////////////  D E L E T E   O N E /////////////////////////

router.delete("/:alert_id", isAuthenticated, (req, res, next) => {

    const { alert_id } = req.params

    Alert
        .findByIdAndDelete(alert_id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))

})


module.exports = router