import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import roomRoute from './routes/rooms.js';
import facilityRoute from './routes/facilities.js';
import bookingRoute from './routes/booking.js';

const app = express();
dotenv.config();

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        throw error
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('welcome');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/facilities', facilityRoute);
app.use('/api/bookings', bookingRoute);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    });
});

const PORT = process.env.PORT || 4000;

app.listen (PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})