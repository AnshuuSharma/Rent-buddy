import express from 'express';
import { bookVisit, cancelBooking, createUser, favResidency, getALLBookings, getAllFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';
const router=express.Router()

router.post("/register",jwtCheck,createUser);
router.post("/bookVisit/:id",jwtCheck,bookVisit);
router.post("/allBookings",getALLBookings);
router.post("/removeBooking/:id",jwtCheck,cancelBooking)
router.post("/addFav/:rid",jwtCheck,favResidency);
router.post("/allfav/",jwtCheck,getAllFav)

export {router as userRoute}