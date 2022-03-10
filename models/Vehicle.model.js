const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");


const vehicleSchema = new Schema(
    {

        name: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            default: "link"
        },
        description: {
            type: String,

        },
        kmMonth: {
            type: Number,
            // required: true
        },
        purchaseDate: {
            type: Date
        },

        licensePlate: {
            type: String
        },
        owner: { type: Schema.Types.ObjectId, ref: 'User' },

        alertColor: String
    },
    {
        timestamps: true,
    }
)
const Vehicle = model("Vehicle", vehicleSchema);

// Vehicle.syncIndexes()

module.exports = Vehicle