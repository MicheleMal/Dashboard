import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    surname: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },

    salary: {
        type: Number,
        require: true,
    },

    assumptionDate: {
        type: Date,
        require: true,
    },

    dateBirth: {
        type: Date,
        require: true,
    },
}, {timestamps: true});

export const Employee = mongoose.model('Employee', employeesSchema);