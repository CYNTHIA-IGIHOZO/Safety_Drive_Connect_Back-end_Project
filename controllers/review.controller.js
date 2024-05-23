import { validationResult } from 'express-validator';
import Profile from '../models/profile.model.js';
import Review from '../models/review.model.js';
import User from '../models/user.model.js';

// Function to create a review for a driver

const reviewController ={

    viewProfile:async(req,res)=>{
        try{
const profile=await Profile.findById(req.params.id);
if(profile){
    res.status(200).json(profile);
}
        }
        catch(err){
            console.log(err.message);
            res.status(500).json({message:"Internal server error"}); 
    }
},


 createComment:async (req, res) => {
    try {
        const newComment = await Review.create(req.body);
        if (newComment) {
            const populatedComment = await Review.findById(newComment._id).populate('user', 'userName').exec();
            res.status(200).json({
                message: "Comment created successfully",
                comment: populatedComment
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}}



export default reviewController;

    // try {
    //     // Check if required fields are present in the request body
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
        
    //     const { user, rating, comment } = req.body;
    //     const userId = req.user.id; // The ID of the logged-in user

    //     // Check if the driver's profile exists in the Profile collection
    //     const driverProfile = await Profile.findOne({ user: driver });

    //     if (!driverProfile) {
    //         return res.status(404).json({ message: 'Driver profile not found.' });
    //     }

    //     // Check if the user in the profile is a driver
    //     const driverUser = await User.findById(driverProfile.user);
    //     if (driverUser.role !== 'Driver') {
    //         return res.status(400).json({ message: 'User is not a driver.' });
    //     }

    //     // Check if the logged-in user is trying to review themselves
    //     if (userId === driverUser._id.toString()) {
    //         return res.status(400).json({ message: 'You cannot review yourself.' });
    //     }

    //     // Create a new review
    //     const newReview = new Review({
    //         user: userId,
    //         driver: driverUser._id,
    //         rating,
    //         comment,
    //     });

    //     // Save the review to the database
    //     const savedReview = await newReview.save();

    //     res.status(201).json({
    //         message: 'Review created successfully',
    //         review: savedReview,
    //     });
    // } catch (error) {
    //     console.error(error);
    //     next(error);
    // }

