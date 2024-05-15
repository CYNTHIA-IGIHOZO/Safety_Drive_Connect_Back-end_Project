import { validationResult } from 'express-validator';
import Profile from '../models/profile.model.js';
import upload from '../utils/uploading.js'; // Assuming this imports your file upload middleware
import { BadRequestError } from '../errors/index.js';
import { NotFoundError } from '../errors/index.js'; // Assuming you have a NotFoundError defined

// allDrivers function
export const allDrivers = async (req, res, next) => {
    try {
        // Get all drivers
        const drivers = await Profile.find();

        res.status(200).json({
            message: 'List of all Drivers',
            drivers: drivers,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

//booking driver functions



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
