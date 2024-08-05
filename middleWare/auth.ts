// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: 'No Token, authorization denied' });
        }

        jwt.verify(token, process.env.JWT_SECRET || '', (err : any, user: any) => {
            if (err) {
                return res.status(403).json({ msg: 'Token is not valid' });
            }

            req.user = user; 
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

