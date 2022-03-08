const express = require("express")
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const transporter = require('../config/transporter.config')
const router = express.Router()
const saltRounds = 10


///////// C R E A T E  U S E R //////////

router.post('/signup', (req, res, next) => {

    const { email, password, name } = req.body

    if (email === '' || password === '' || name === '') {
        res.status(400).json({ message: "Provide email, password and name" })
        return
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    // if (!emailRegex.test(email)) {
    //     res.status(400).json({ message: 'Provide a valid email address.' })
    //     return
    // }

    // if (password.length < 2) {
    //     res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' })
    //     return
    // }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, name })
        })
        .then((createdUser) => {
            const { email, name, _id } = createdUser

            const user = { email, name, _id }

            res.status(201).json({ user })

            transporter.sendMail({
                from: "imdbprojectteam@gmail.com",
                to: user.email,
                subject: `Welcome to AutoAlert!`,
                text: `${user.name}, welcome to AutoAlert, your personalized reminder service! This is the mail where you are going to receive all the notifications! FUEGOTE!!!`,
                html: "<p>" + `${user.name},  welcome to AutoAlert, your personalized reminder service! This is the mail where you are going to receive all the notifications! FUEGOTE!!!` + "</p>"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})



///////// L O G I N   U S E R //////////

router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, name } = foundUser

                const payload = { _id, email, name }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(req.payload);
    res.status(200).json(req.payload)
})


module.exports = router