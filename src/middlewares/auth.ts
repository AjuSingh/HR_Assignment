import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/auth";

export function validateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : '';
        if (!token || !validateToken(token)) return res.status(401).json({ message: 'Please provide a valid token' });
        next()
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong!' })
    }
}