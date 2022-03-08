const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

const alertSchema = new Schema({

    name: {
        type: String,
        required: true,
        enum: ['CAMBIO DE ACEITE', 'CAMBIO PASTILLAS DE FRENO', 'ENGRASADO', 'REVISIÓN GENERAL',
            'HINCHADO DE RUEDAS', 'CAMBIO DE LIMPIA PARABRISAS', 'LIMPIEZA', 'SUSPENSIONES']
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
