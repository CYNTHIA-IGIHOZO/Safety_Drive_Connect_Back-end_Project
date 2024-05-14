import mongoose from 'mongoose';
import Car from '../models/car.model.js'

const profileSchema = new mongoose.Schema({
    profilePicture:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    phoneNumber: {
        type: String,
        required: true
    },
    
    location: {
        type: String,
        required: true
    },
    costPerhr:{
        type: String,
        required: true
    },
    drivingLicense: { 
        type: String,
        enum: ['A', 'B', 'C', 'D','E'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: false
    },
    car: {
        type: Boolean,
        required: true,
        default: false
    },
    carDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    availability:{
        type:Boolean,
        required:true,
        default: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Profile = mongoose.model('profile', profileSchema);

export default Profile;