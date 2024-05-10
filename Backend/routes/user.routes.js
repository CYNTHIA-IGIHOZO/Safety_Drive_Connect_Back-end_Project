import express from 'express';
const userRouter = express.Router();
import { SignUp, SignIn, ValidateOpt, ForgotPassword, ResetPassword } from '../controllers/user.controller.js';
import { signUpValidations, signInValidations, otpValidation, forgotPasswordValidation, resetPasswordValidation, createProfileValidation  } from '../utils/validation.js';
import {createProfile, updateProfile, allDrivers, createReview} from '../controllers/general.controller.js';
import authMiddleware from '../middlewares/auth.js';
import upload from "/Users/HP/Desktop/ABCollector/Kigali_Spotter-System/utils/uploading.js";


userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/signin', signInValidations, SignIn);
userRouter.post('/verify', otpValidation, ValidateOpt);
userRouter.post('/forgotPassword', forgotPasswordValidation, ForgotPassword);
userRouter.post('/resetPassword', resetPasswordValidation, ResetPassword);
userRouter.post('/createprofile',createProfileValidation,createProfile);
userRouter.patch('/updateprofile', updateProfile);
userRouter.get('/alldrivers', allDrivers );
userRouter.post('/createreview', createReview);
export default userRouter;
