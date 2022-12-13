import express from 'express';

import { createFacility, updateFacility, deleteFacility, getFacility, getAllFacilities } from '../controllers/facilities.js';
import { verifyAdmin  } from '../utils/token.js';

const router = express.Router();

// create a new Facility
router.post('/', verifyAdmin, createFacility);

// update a Facility
router.put('/:id', verifyAdmin, updateFacility);

// delete a Facility
router.delete('/:id', verifyAdmin, deleteFacility);

// get a Facility
router.get('/:id', getFacility);

// get all Facilities
router.get('/', getAllFacilities);

export default router;