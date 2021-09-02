const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    contacts: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
},{
    timestamps: {
        createdAt: 'created_at' 
    } 
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;