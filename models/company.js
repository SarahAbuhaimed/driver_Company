const mongoose= require('mongoose')
const Schema= mongoose.Schema

const companySchema= new Schema({
    name: {type: String, required: true},
    logo:{type: String}, 
    address:{type: String, required: true}, 
    city:{type: String, required: true}, 
    telephone:{type: Number, required: true},  
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }]   
}, {timestamps: true})

const Company = mongoose.model('Company', companySchema)
module.exports = Company;
