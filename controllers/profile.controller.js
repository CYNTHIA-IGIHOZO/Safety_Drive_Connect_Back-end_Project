import { validationResult } from 'express-validator';
import Profile from '../models/profile.model.js';

import { BadRequestError } from '../errors/index.js';
import { NotFoundError } from '../errors/index.js'; 
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

// createProfile function
export const createProfile = async (req, res, next) => {

    try {
        const { drivingLicense, ...otherFields } = req.body;
        if (!req.files || !("profilePicture" in req.files) ||!("image" in req.files)) {
          return res.json({ message: "err" });
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


            // Save the profile to the database
            const savedProfile = await Profile.create({
                profilePicture:profileP.secure_url,
                image:profileI.secure_url,
                ...otherFields
            });

            res.status(201).json({
                message: 'Profile created successfully',
                profile: savedProfile,
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
            drivers: drivers,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

