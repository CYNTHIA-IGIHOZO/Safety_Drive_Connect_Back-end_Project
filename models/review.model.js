// models/review.js

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // driver: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Profile',
    //     required: true,
    // },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    
},{
    timestamps:true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
