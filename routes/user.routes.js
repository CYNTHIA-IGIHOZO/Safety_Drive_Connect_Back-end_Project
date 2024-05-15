import express from 'express';
const userRouter = express.Router();
import { SignUp, SignIn, ValidateOpt, ForgotPassword, ResetPassword } from '../controllers/user.controller.js';
import {allUsers,deleteUsers} from '../controllers/admin.controller.js'
import { signUpValidations, signInValidations, otpValidation, forgotPasswordValidation, resetPasswordValidation, createProfileValidation  } from '../utils/validation.js';
import {createProfile, updateProfile, allDrivers, createReview} from '../controllers/profile.controller.js';
import authMiddleware from '../middlewares/auth.js';
import upload from '../utils/uploading.js';
import {authorizeRoles} from '../middlewares/role.js'



userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/signin', signInValidations, SignIn);
userRouter.post('/verify', otpValidation, ValidateOpt);
userRouter.post('/forgotPassword', forgotPasswordValidation, ForgotPassword);
userRouter.post('/resetPassword', resetPasswordValidation, ResetPassword);
userRouter.post('/createprofile',authorizeRoles(['Admin','Driver']),createProfile);
userRouter.patch('/updateprofile/:id',createProfileValidation, updateProfile);
userRouter.get('/alldrivers', allDrivers );
userRouter.post('/createreview', createReview);







userRouter.get('/admin/allusers', authorizeRoles(['Admin']), allUsers);
userRouter.delete('/admin/delete/:id',authorizeRoles(['Admin']),deleteUsers);

export default userRouter;
