import { Router } from "express";
import { getUserRoutes } from "./user";
import { getCategoryRoutes } from "./category";


export function getRoutes(){
    const router = Router();

    router.use('/user', getUserRoutes())
    router.use('/', getCategoryRoutes())
    return router;
}