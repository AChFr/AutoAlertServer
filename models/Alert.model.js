const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

const alertSchema = new Schema({

    name: {
        type: String,
        required: true,
        enum: ['Oil change', 'Brake pads change', 'Lubrication', 'Technical checkup',
            'Tire pressure check', 'Wipers change', 'Clean up', 'Suspension check', 'ITV']
    },

    initializedAt: {
        type: Date,
        required: true
    },
    dueAt: {
        type: Date,
        required: true
    },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' }
},
    {
        timestamps: true,
    }
)
const Alert = model("Alert", alertSchema);

Alert.syncIndexes()

module.exports = Alert;
