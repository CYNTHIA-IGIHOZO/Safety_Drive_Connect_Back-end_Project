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
    
    body("phoneNumber", "PhoneNumber is required").not().isEmpty(),
    body("location", "Location is required").not().isEmpty(),
    body("costPerhr", "Cost is required").not().isEmpty(),
    body("drivingLicense", "DrivingLicense is required").not().isEmpty(), 
    body("image url", "Image is required").not().isEmpty(), 
]