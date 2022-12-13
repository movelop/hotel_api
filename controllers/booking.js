import Booking from '../models/Booking.js'
import { generateId } from '../utils/helpers.js'
import { createError } from "../utils/error.js";

// create a new Booking
export const createBooking = async (req, res, next) => {
    const data = req.body;
    const {
        firstname,
        lastname,
        email,
        phone,
        roomTitle,
        adults,
        children,
        startDate,
        endDate,
        numberOfRooms,
        selectedRooms,
        roomNumbers,
        price,
        paymentReference,
    } = data;
    try {
        // generate unique booking id
        let bookingId = generateId(12);

        // check if ID already exists
        // first get all ID's and store them in an array
        const idArr = [];
        const allBookings = await Booking.find();

        allBookings.map((info) => {
            idArr.push(info.confirmation);
        });
        // then use a while loop, as long as the new ID matches an item in the array, create a new one
        while (idArr.includes(bookingId)) {
            bookingId = generateId(12);
        }

        // create a new booking in the MongoDB DB
        const result = await Booking.create({
            firstname,
            lastname,
            email,
            phone,
            roomTitle,
            adults,
            children,
            startDate,
            endDate,
            numberOfRooms,
            selectedRooms,
            roomNumbers,
            price,
            paymentReference,
            confirmation: bookingId,
        })
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteBooking = async(req, res, next) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json('Booking deleted');
    } catch (error) {
        next(error);
    }
};

export const getAllBookings = async(req, res, next) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        return res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

export const getLatestBooking = async (req, res, next) => {
    try {
        
        const bookings = await Booking.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(bookings);
    }catch (error) {
        next(error);
    }
}

export const getBooking = async(req, res, next) => {
    try {
        // 
        let existingBooking;
        const { email, confirmation } = req.body;

        if(confirmation?.length > 0 ){
            existingBooking = await Booking.find({
                confirmation: confirmation.toUpperCase(),
            });
        } else if (email?.length > 0) {
            existingBooking = await Booking.find({ email: email });
        } else {
            return next( createError(400, 'Please enter a valid email address or confimation code') );
        }

        if (existingBooking.length) {
            return res.status(200).json(existingBooking);
        } else {
            return next(createError(404, 'Not found'));
        }
    } catch (error) {
        next(error);
    }
};

export const getABooking = async(req, res, next) => {
    try {
        // 
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};

export const getIncome = async (req, res, next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previous5Month = new Date(new Date().setMonth(lastMonth.getMonth() - 4));
    
    try {
        const income = await Booking.aggregate([
          {
            $match: {
              createdAt: { $gte: previous5Month }
            },
          },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$price",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
              "count": { "$sum": 1 },
            },
          },
        ]).sort({ _id: -1 });
        res.status(200).json(income);
      } catch (err) {
        res.status(500).json(err);
      }
    
}

export const getYearlyIncome = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const prevYear = new Date(new Date().setFullYear(lastYear.getFullYear() - 1));

    try {
        const income = await Booking.aggregate([
            { $match: { createdAt: { $gte: prevYear } } },
            {
                $project: {
                    year: { $year: '$createdAt' },
                    sales: '$price',
                },
            },
            {
                $group: {
                    _id: '$year',
                    total: { $sum: '$sales' },
                    "count": { "$sum": 1 },
                },
            }
        ]).sort({ _id: -1 });
    
        res.status(200).json(income);
    } catch (error) {
        next(error);
    }
};



