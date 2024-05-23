import { validationResult } from 'express-validator';
import Profile from '../models/profile.model.js';
import upload from '../utils/uploading.js'; // Assuming this imports your file upload middleware
import { BadRequestError } from '../errors/index.js';
import { NotFoundError } from '../errors/index.js'; // Assuming you have a NotFoundError defined

