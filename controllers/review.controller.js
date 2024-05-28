import { validationResult } from 'express-validator';
import Profile from '../models/profile.model.js';
import Review from '../models/review.model.js';
import User from '../models/user.model.js';

// Function to create a review for a driver

const reviewController = {
    viewProfile: async (req, res) => {
        try {
            const profile = await Profile.findById(req.params.id);
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    createComment: async (req, res) => {
        try {
            const { rating, comment } = req.body;
            const userId = req.user._id;

            if (!rating || !comment || !userId) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            // Create the new comment
            const newComment = await Review.create({
                rating,
                comment,
                user: userId
            });

            if (newComment) {
                const populatedComment = await Review.findById(newComment._id)
                    .populate('user', 'userName email')
                    .exec();

                res.status(200).json({
                    message: "Comment created successfully",
                    user: {
                        name: req.user.userName},
                    comment: populatedComment
                });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getComments: async (req, res) => {
        try {
            const comments = await Review.find()
                .populate('user', 'userName email')
                .exec();
    
            res.status(200).json({
                message: "Comments fetched successfully",
                comments: comments
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateComment: async (req, res) => {
        try {
            const { rating, comment } = req.body;
            const commentId = req.params.id;
    
            const updatedComment = await Review.findByIdAndUpdate(commentId, {
                rating,
                comment
            }, { new: true }).populate('user', 'userName email');
    
            if (updatedComment) {
                res.status(200).json({
                    message: "Comment updated successfully",
                    comment: updatedComment
                });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;
    
            const deletedComment = await Review.findByIdAndDelete(commentId);
    
            if (deletedComment) {
                res.status(200).json({ message: "Comment deleted successfully" });
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    
    
};

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

