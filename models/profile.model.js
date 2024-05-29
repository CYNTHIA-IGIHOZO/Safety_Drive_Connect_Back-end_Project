// models/profile.js

import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    costPerhr: {
        type: String,
        required: false
    },
    drivingLicense: { 
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        required: false
    },
    image: {
        type: String,
        required: false
    },
    car: {
        type: Boolean,
        required: false
    },
    availability: {
        type: Boolean,
        required: true,
        default: false
    },
    Gender: {
        type: String,
        required: false,
        enum: ["Female", "Male", "Other"]
    },
    AddBio: {
        type: String,
        required: false
    },
    SpokenLanguages: {
        type: [String],
        required: false,
        enum: ["English", "French", "Swahili", "Kinyarwanda"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    review:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: false 
    }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
