import mongoose from 'mongoose';


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

    car: {
        type: Boolean,
        required: true,
    },
    availability:{
        type:Boolean,
        required:true,
        default: true
    }
});

const Profile = mongoose.model('profile', profileSchema);

export default Profile;