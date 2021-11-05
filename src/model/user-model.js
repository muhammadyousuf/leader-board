const mongoose = require("mongoose");
const uuid = require('uuid');
const { actionType } = require("../enum");
const { schemaOption } = require("../helper/schemaOption")

const schema = new mongoose.Schema({
    id: {
        type: String,
        default: () => {
            return uuid.v4();
        },
        required: true,
        index: true
    },

    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },


    country: {
        type: String,
        trim: true,
        lowercase: true,
    },


    actionType: {
        type: String,
        enum: Object.values(actionType),
        default: actionType.Running
    },
    joinDate: {
        type: Date,
        required: true
    },

    point: {
        type: Number,
        default: 0
    },

    units: {
        type: Number,
        trim: true
    },


    isDelete: { type: Boolean, default: false },


}, schemaOption)












const model = mongoose.model("user", schema);
module.exports = model;