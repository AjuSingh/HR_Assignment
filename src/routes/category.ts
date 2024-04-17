import { Router } from "express";
import { validateUser } from "../middlewares/auth";
import DIContainer from "../loaders/containerLoader";
import CategoryController from "../Controller/CategoryController";
import ServiceController from "../Controller/ServiceController";

export function getCategoryRoutes() {
    const router = Router();
    router.use(validateUser);
    const categoryController = DIContainer.container.get<CategoryController>('CategoryController');
    const serviceController = DIContainer.container.get<ServiceController>('ServiceController');
    router.post('/category', categoryController.createCategory);
    router.get('/categories', categoryController.getCategories);
    router.put('/category/:categoryId', categoryController.updateCategory);
    router.delete('/category/:categoryId', categoryController.deleteCategory);
    router.post('/category/:categoryId/service', serviceController.createService);
    router.get('/category/:categoryId/services', serviceController.getServices);
    router.delete('/category/:categoryId/service/:serviceId', serviceController.deleteService)
    router.put('/category/:categoryId/service/:serviceId', serviceController.updateService)
    return router;
}