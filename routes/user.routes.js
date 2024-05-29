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


userRouter.post('/createReachout',createReachout);
userRouter.get('/viewallReachout',getReachout);
userRouter.delete('/viewReachout/:id',deleteReachout)



userRouter.post('/createprofile',createProfileValidation, upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'image', maxCount: 1 }]),createProfile);
userRouter.patch('/updateprofile/:id',updateProfile);
userRouter.get('/allprofiles',allProfiles);
userRouter.get('/profile/:id',getProfileById);
userRouter.delete('/deleteprofile/:id',deleteProfile);
userRouter.get('/viewProfile/:id',reviewController.viewProfile);


userRouter.post('/createReview/:id',reviewController.createComment);
userRouter.get('/getReview/:id',reviewController.getComments);
userRouter.patch('/updateReview/:id', reviewController.updateComment);
userRouter.delete('/deleteReview/:id',reviewController.deleteComment);


userRouter.post('/createService',createService);
userRouter.get('/viewallService',getAllServices);
userRouter.get('/viewService/:id',getServiceById);
userRouter.patch('/updateService/:id',updateServiceById);
userRouter.delete('/deleteService/:id',deleteServiceById);






userRouter.get('/admin/allusers', allUsers);
userRouter.delete('/admin/delete/:id',deleteUsers);

export default userRouter;
