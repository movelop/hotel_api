import express from 'express';

import { createBooking, deleteBooking, getAllBookings, getBooking, getABooking, getIncome, getLatestBooking, getYearlyIncome  } from '../controllers/booking.js';
import { verifyAdmin, verifyPayment } from '../utils/token.js';

const router = express.Router();

router.post('/create', createBooking);
router.delete('/:id', deleteBooking);
router.get("/", verifyAdmin, getAllBookings);
router.get("/latest", verifyAdmin, getLatestBooking);
router.post("/", getBooking);
router.get('/:id', verifyAdmin, getABooking);
router.get('/verify-payment/:reference', verifyPayment);
router.get('/income/month', verifyAdmin, getIncome);
router.get('/income/year', verifyAdmin, getYearlyIncome);


export default router;