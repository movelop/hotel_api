import jwt from 'jsonwebtoken';
import axios from 'axios';

import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not allowed to access this page"));
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, "Invalid token"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if(req.user._id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized to perform this action!"));
      }
    });
};


  
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.isAdmin) {
        next();
    } else {
      return next(createError(403, "You are not authorized to perform this action!"));
  }
})
};

export const verifyPayment = async (req, res, next) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
  };


  const referenceID = req.params.reference;
  try {
      const apiRes = await axios.get(
          `https://api.paystack.co/transaction/verify/${referenceID}`,
          {
              headers,
          }
      );

      res.status(200).json(apiRes.data);
  } catch (error) {
      next(error);
  }
}