const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    image: {type: String},
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
 } , {
    timestamps: true 
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;