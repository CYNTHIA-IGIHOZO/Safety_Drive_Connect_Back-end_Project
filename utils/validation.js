import { body } from "express-validator";

export const signUpValidations = [
    body("userName", "User name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const signInValidations = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Invalid password").isStrongPassword()
];

export const forgotPasswordValidation = [
    body("email", "Email must be provided").not().isEmpty(),
];

export const resetPasswordValidation = [
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const otpValidation = [
    body("otp", "Otp must be provided").not().isEmpty(),
];
export const createProfileValidation = [ 
    body("fullName", "Full Name is required").not().isEmpty(),
    body("PhoneNumber", "PhoneNumber is required").not().isEmpty(),
    body("location", "location is required").not().isEmpty(),
    body("cost", "cost is required").not().isEmpty(),
    body("drivingLesence", "DrivingLesence is required").not().isEmpty,
    body("image urL", "image is required").not().isEmpty(),
];