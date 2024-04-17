import { Router } from "express";
import DIContainer from "../loaders/containerLoader";
import AuthController from "../Controller/AuthController";


export function getUserRoutes() {
    const router = Router();
    const authController = DIContainer.container.get<AuthController>('AuthController');
    router.post('/login', authController.login)
    return router;
}