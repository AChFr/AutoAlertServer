const express = require("express")
const router = require("express").Router();
const { isAuthenticated } = require('./../middlewares/jwt.middleware')

const Vehicle = require("../models/Vehicle.model")
const Alert = require("../models/Alert.model")
////////////////// L I S T  A L L ////////////////////////

router.get('/allvehicles', isAuthenticated, (req, res, next) => {

    Vehicle
        .find({ owner: req.payload._id })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

///////////////// C R E A T E  O N E /////////////////////////

router.post("/create", isAuthenticated, (req, res, next) => {

    Vehicle
        .create(req.body)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
})

//////////////////// L I S T  O N E //////////////////////////

router.get('/:vehicle_id', (req, res, next) => {

    const { vehicle_id } = req.params

    Vehicle
        .findById(vehicle_id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

///////////////// E D I T  O N E /////////////////////////

router.put("/:vehicle_id", isAuthenticated, (req, res, next) => {

    const { vehicle_id } = req.params

    Vehicle
        .findByIdAndUpdate(vehicle_id, { ...req.body }, { new: true })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
})


///////////////// D E L E T E   O N E /////////////////////////
//////// A N D  T H E   A S S O C I A T E D  A L E R T S //////

router.delete("/:vehicle_id", isAuthenticated, (req, res, next) => {

    const { vehicle_id } = req.params

    let allPromises = []

    Alert
        .find({ vehicle: vehicle_id })
        .then(result => {

            result.forEach(elm => {
                allPromises.push(Alert.findByIdAndDelete(elm._id))
            })
            return Promise.all(allPromises)
        })
        .then((result) => {
            return Vehicle.findByIdAndDelete(vehicle_id)
        })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))

})


module.exports = router