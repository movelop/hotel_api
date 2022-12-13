import express from 'express';
import { createRoom, updateRoomAvailability, updateRoom, deleteRoom, getRoom, getAllRooms, cancelRoomReservation } from '../controllers/rooms.js';

import { verifyAdmin } from '../utils/token.js';

const router = express.Router();

// Create a new Room
router.post('/', verifyAdmin, createRoom);

// Update Room availability
router.put('/availability/:id', updateRoomAvailability);

// cancel room reservation 

router.put('/reservation/:id', cancelRoomReservation);

// Update Room 
router.put('/:id', verifyAdmin, updateRoom);

// Delete a Room
router.delete('/:id', verifyAdmin, deleteRoom);

// Get a Room
router.get('/:id', getRoom);

// Get all Rooms
router.get('/', getAllRooms);

export default router;