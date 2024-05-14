import UserModel from "../models/user.model.js";
import configrations from '../configs/index.js'
//import { requireAdmin } from "../middlewares/auth.js";
import { requireUser } from "../middlewares/auth.js";
import { BadRequestError } from "../errors/index.js";
import { UnauthorizedError } from "../errors/index.js";
import { validationResult } from "express-validator";
import path from "path"
import authMiddleware from '../middlewares/auth.js'


import Profile from '../models/profile.model.js';
//import { profile } from "console";



// createProfile function
export const createProfile = (async (req, res, next) => {
    try {
        // Check if required fields are present in the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract user ID from the logged-in user's information (assuming it's available in req.user)
        const userId = req.user.id; 

        // Assuming carId is obtained from the request body or another source
        const carId = req.body.carId; 

        // Create a new profile
        const { phoneNumber, location, costPerhr, drivingLicense, image } = req.body;

        const newProfile = new Profile({
            profilePicture: req.body.profilePicture, 
            user: userId,
            phoneNumber,
            location,
            costPerhr,
            drivingLicense,
            image,
            car: carId,
        });

        // Save the profile to the database
        const savedProfile = await newProfile.save();

        res.status(201).json({
            message: 'Profile created successfully',
            profile: savedProfile, 
        });
    } catch (error) {
        console.error(error);
        next(error); 
    }
});
// updateProfile function
export const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the profile exists
        const profile = await Profile.findById(id);
        if (!profile) {
            throw new NotFoundError('Profile not found');
        }

        // Update the profile
        const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// allDrivers function
export const allDrivers = async (req, res, next) => {
    try {
        // Get all drivers
        const drivers = await Profile.find();

        res.status(200).json({
            message: 'List of all Drivers',
            drivers: drivers 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// createReview function
export const createReview = async (req, res, next) => {
    try {
        const { driverId, rating, comment } = req.body;

        // Check if required fields are present
        if (!driverId || !rating || !comment) {
            throw new BadRequestError('Missing required fields');
        }

        // Create a new review
        const newReview = new Review({
            user: req.user.id, 
            driver: driverId,
            rating,
            comment,
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        res.status(201).json({
            message: 'Review created successfully',
            review: savedReview,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
