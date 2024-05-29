import { validationResult } from 'express-validator';
import Profile from '../models/profile.model.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// createProfile function
export const createProfile = async (req, res, next) => {
    try {
        const userId = req.user;
        const existingProfile = await Profile.findOne({ user: userId });

        // if (existingProfile) {
        //     return res.status(400).json({ message: "Profile already exists for this user." });
        // }

        const { drivingLicense, ...otherFields } = req.body;
        if (!req.files || !("profilePicture" in req.files) || !("image" in req.files)) {
            return res.json({ message: "Files missing" });
        }
        const dateNow = Date.now();
        const ProfilePicture = `${drivingLicense}_profilePicture_${dateNow}`;
        const image = `${drivingLicense}_image_${dateNow}`;

        const profileP = await cloudinary.v2.uploader.upload(
            req.files.profilePicture[0].path,
            {
                folder: "uploads",
                public_id: ProfilePicture,
            }
        );
        const profileI = await cloudinary.v2.uploader.upload(
            req.files.image[0].path,
            {
                folder: "uploads",
                public_id: image,
            }
        );

        const savedProfile = await Profile.create({
            profilePicture: profileP.secure_url,
            image: profileI.secure_url,
            user: userId,
            ...otherFields,
            createdBy: userId
        });

        res.status(201).json({
            message: 'Profile created successfully',
            // user: {
            //     name: req.user.userName,
            //     email: req.user.email
            // },
            profile: savedProfile
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

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
            profile: updatedProfile
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// allProfiles function
export const allProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json({
            message: 'List of all profiles',
            profiles: profiles
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// getProfileById function
export const getProfileById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find profile by ID
        const profile = await Profile.findById(id);
        if (!profile) {
            throw new NotFoundError('Profile not found');
        }

        res.status(200).json({
            message: 'Profile retrieved successfully',
            // user: {
            //     name: req.user.userName,
            //     email: req.user.email
            // },
            profile: profile
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// deleteProfile function
export const deleteProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the profile exists
        const profile = await Profile.findById(id);
        if (!profile) {
            throw new NotFoundError('Profile not found');
        }

        // Delete the profile
        await Profile.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Profile deleted successfully'
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
