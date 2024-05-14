import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    carType: {
        type: String,
        required: true
    },
    carPlate: {
        type: String,
        required: true
    },
    carPhoto: {
        type: String,
        required: false
    }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
