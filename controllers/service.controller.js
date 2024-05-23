import { BadRequestError } from '../errors/index.js';
import { NotFoundError } from '../errors/index.js';
import Service from '../models/service.model.js';


//Create service

export const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

//Get all services

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get service by id

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            res.status(200).json(service);
        } else {
            throw new NotFoundError('Service not found');
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

//Update service by id

export const updateServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (service) {
            res.status(200).json(service);
        } else {
            throw new NotFoundError('Service not found');
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

//Delete service by id

export const deleteServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (service) {
            res.status(200).json(service);
        } else {
            throw new NotFoundError('Service not found');
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// //Get service by name

// export const getServiceByName = async (req, res) => {
//     try {
//         const service = await Service.findOne({ name: req.params.name });
//         if (service) {
//             res.status(200).json(service);
//         } else {
//             throw new NotFoundError('Service not found');
//         }
//     } catch (error) {
//         if (error instanceof NotFoundError) {
//             res.status(404).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: error.message });
//         }
//     }
// };
