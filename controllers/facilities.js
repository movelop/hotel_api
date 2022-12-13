import Facility from "../models/Facility.js";

export const createFacility = async (req, res, next) => {
    const newFacility = new  Facility(req.body);
    try {
        const savedFacility = await newFacility.save();
        res.status(200).json(savedFacility);
    } catch (error) {
        next(error);
    }
};
export const updateFacility = async (req, res, next) => {
    try {
        const updatedFacility = await Facility.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true });
        res.status(200).json(updatedFacility);
    } catch (error) {
        next(error);
    }
};
export const deleteFacility = async (req, res, next) => {
    try {
        await Facility.findByIdAndDelete(req.params.id);
        res.status(200).json('Facility deleted successfully');
    } catch (error) {
        next(error);
    }
};
export const getFacility = async (req, res, next) => {
    try {
        const facility = await Facility.findById(req.params.id);
        res.status(200).json(facility);
    } catch (error) {
        next(error);
    }
};
export const getAllFacilities = async (req, res, next) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json(facilities);
    } catch (error) {
        next(error);
    }
};