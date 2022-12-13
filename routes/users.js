import express from 'express';

import { updateUser, deleteUser, getAllUsers, getUser } from '../controllers/users.js';

import { verifyUser, verifyAdmin } from '../utils/token.js';

const router = express.Router();

// Update a User with Id

router.put('/:id', verifyUser, updateUser);

// Delete a User with Id 

router.delete('/:id', verifyUser, deleteUser);

// Get a single User with Id

router.get('/:id',verifyUser, getUser);

// Get all Users

router.get('/', verifyAdmin, getAllUsers);


export default router;