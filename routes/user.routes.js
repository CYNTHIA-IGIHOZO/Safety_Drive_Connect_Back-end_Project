import express from 'express';
const userRouter = express.Router();

import { SignUp, SignIn, ValidateOpt, ForgotPassword, ResetPassword } from '../controllers/user.controller.js';
import {allUsers,deleteUsers} from '../controllers/admin.controller.js'
import { signUpValidations, signInValidations, otpValidation, forgotPasswordValidation, resetPasswordValidation, createProfileValidation, createReviewValidation } from '../utils/validation.js';
import {createProfile,updateProfile,allProfiles,getProfileById,deleteProfile} from '../controllers/profile.controller.js';
import {createReachout,getReachout,deleteReachout} from '../controllers/reachout.controller.js'; 
import reviewController from '../controllers/review.controller.js';
import authMiddleware from '../middlewares/auth.js';
import {createService,getAllServices, getServiceById, updateServiceById, deleteServiceById} from '../controllers/service.controller.js';

import {authorizeRoles} from '../middlewares/role.js'
import multer from "multer"
const upload = multer({dest:'uploads/'})


userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/signin', signInValidations, SignIn);
userRouter.post('/verify', otpValidation, ValidateOpt);
userRouter.post('/forgotPassword', forgotPasswordValidation, ForgotPassword);
userRouter.post('/resetPassword', resetPasswordValidation, ResetPassword);


userRouter.post('/reachout',createReachout);
userRouter.get('/newreach',authorizeRoles(['Admin']),getReachout);
userRouter.delete('/reach/:id',authorizeRoles(['Admin']),deleteReachout)



userRouter.post('/createprofile',createProfileValidation, upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'image', maxCount: 1 }]),authorizeRoles(['Admin', 'Driver']),createProfile);
userRouter.patch('/updateprofile/:id', authorizeRoles(['Admin', 'Driver']),updateProfile);
userRouter.get('/allprofiles', authorizeRoles(['Admin']),allProfiles);
userRouter.get('/profile/:id', authorizeRoles(['Admin', 'Driver','Customer']),getProfileById);
userRouter.delete('/deleteprofile/:id', authorizeRoles(['Admin']),deleteProfile);
userRouter.get('/viewProfile/:id',reviewController.viewProfile);


userRouter.post('/createReview/:id',authorizeRoles(['Admin','Customer']),reviewController.createComment);
userRouter.get('/getReview/:id',reviewController.getComments);
userRouter.patch('/updateReview/:id', reviewController.updateComment);
userRouter.delete('/deleteReview/:id',reviewController.deleteComment);


userRouter.post('/service',authorizeRoles(['Admin']),createService);
userRouter.get('/allservices',getAllServices);
userRouter.get('/service/:id',getServiceById);
userRouter.patch('/service/:id',authorizeRoles(['Admin']),updateServiceById);
userRouter.delete('/service/:id',authorizeRoles(['Admin']),deleteServiceById);






userRouter.get('/admin/allusers', authorizeRoles(['Admin']), allUsers);
userRouter.delete('/admin/delete/:id',authorizeRoles(['Admin']),deleteUsers);

export default userRouter;
