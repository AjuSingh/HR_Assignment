import { injectable } from "inversify";
import { Request, Response } from "express";
import { categorySchema } from "../validations/common";
import { z } from "zod";
import { Category } from "../models/Category";

@injectable()
export default class CategoryController {

    public createCategory = async (req: Request, res: Response) => {
        try {
            const body = categorySchema.parse(req.body);
            const category = await Category.create(body);
            if (!category) return res.status(500).json({ message: 'Error while creating category' });
            return res.status(200).json({ category });
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(403).json({ message: JSON.parse(err.message) });
            }
            res.status(500).json({ error: err.message });
        }
    }

    public getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await Category.findAll();
            res.status(200).json({ categories });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    public updateCategory = async (req: Request, res: Response) => {
        try {
            const categoryId = req.params.categoryId;
            const body = categorySchema.parse(req.body);
            const category = await Category.update(body, { where: { categoryId } });
            if (!category[0]) return res.status(500).json({ message: 'Error while updating category!' });
            return res.status(200).json({ message: "Updated succesfully." });
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(403).json({ message: JSON.parse(err.message) });
            }
            res.status(500).json({ error: err.message });
        }
    }

    public deleteCategory = async (req: Request, res: Response) => {
        try {
            const categoryId = req.params.categoryId;
            await Category.destroy({ where: { categoryId } })
            res.status(200).json({ message: 'Category delted successfully.' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }


}