import express from 'express';
const userRouter = express.Router();

import { SignUp, SignIn, ValidateOpt, ForgotPassword, ResetPassword } from '../controllers/user.controller.js';
import {allUsers,deleteUsers} from '../controllers/admin.controller.js'
import { signUpValidations, signInValidations, otpValidation, forgotPasswordValidation, resetPasswordValidation, createProfileValidation, createReviewValidation } from '../utils/validation.js';
import {createProfile, updateProfile, allDrivers} from '../controllers/profile.controller.js';
import {createReachout,getReachout,deleteReachout} from '../controllers/reachout.controller.js'; 
import reviewController from '../controllers/review.controller.js';
import authMiddleware from '../middlewares/auth.js';
import {createService,getAllServices, getServiceById, updateServiceById, deleteServiceById} from '../controllers/service.controller.js';

import {authorizeRoles} from '../middlewares/role.js'
import multer from "multer"
const upload = multer({dest:'uploads/'})


userRouter.post('/signup', signUpValidations, SignUp);
userRouter.post('/reachout',createReachout);
userRouter.get('/newreach',getReachout);
userRouter.delete('/reach/:id',deleteReachout)
userRouter.post('/signin', signInValidations, SignIn);
userRouter.post('/verify', otpValidation, ValidateOpt);
userRouter.post('/forgotPassword', forgotPasswordValidation, ForgotPassword);
userRouter.post('/resetPassword', resetPasswordValidation, ResetPassword);
userRouter.post('/createprofile',upload.fields([{name:'profilePicture',maxCount:1},{name:'image',maxCount:1}]),authorizeRoles(['Admin','Driver']),createProfile);
userRouter.patch('/updateprofile/:id',createProfileValidation, updateProfile);
userRouter.get('/alldrivers', allDrivers );
userRouter.get('/viewProfile/:id',reviewController.viewProfile)
userRouter.post('/createComment',reviewController.createComment);

userRouter.post('/service',createService)
userRouter.get('/allservices',getAllServices)
userRouter.get('/service/:id',getServiceById)

userRouter.put('/service/:id',updateServiceById)
userRouter.delete('/service/:id',deleteServiceById)





userRouter.get('/admin/allusers', authorizeRoles(['Admin']), allUsers);
userRouter.delete('/admin/delete/:id',authorizeRoles(['Admin']),deleteUsers);

export default userRouter;
