import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
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
    drivingLesence: {
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
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Profile = mongoose.model('profile', profileSchema);

export default Profile;
