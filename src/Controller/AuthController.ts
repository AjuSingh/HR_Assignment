import { injectable } from "inversify";
import { Request, Response } from "express";
import { userSchema } from "../validations/user";
import { z } from "zod";
import { Users } from "../models/Users";
import { createToken } from "../utils/auth";

@injectable()
export default class AuthController {

    public login = async (req: Request, res: Response) => {
        try {
            const parsedData = userSchema.parse(req.body);
            const user = await Users.findOne({ where: { ...parsedData } });
            if (!user) return res.status(404).json({ message: 'user not authenticated!' })
            const token = createToken(parsedData.email)
            return res.status(200).json({ message: 'Login successful', token });
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(403).json({ message: JSON.parse(err.message) });
            }
            res.status(500).json({ error: err.message });
        }
    }
}