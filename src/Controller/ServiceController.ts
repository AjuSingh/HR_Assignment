import { injectable } from "inversify";
import { Request, Response } from "express";
import { serviceSchema } from "../validations/common";
import { Service } from "../models/Service";
import { z } from "zod";
import { ServicePriceMapping } from "../models/ServicePriceMapping";
import { ServicePrice } from "../models/ServicePrice";

@injectable()
export default class ServiceController {

    public createService = async (req: Request, res: Response) => {
        try {
            const category_id = req.params.categoryId;
            const body = serviceSchema.parse(req.body);
            const service = await Service.create({ category_id, ...body })
            if (!service) return res.status(500).json({ message: 'Error while creating service' });
            const prices = body.prices;
            prices.forEach((price: any) => price['service_id'] = service.id);
            const pricesResponse = await ServicePrice.bulkCreate(prices);
            const mapping = [];
            for (let val of pricesResponse) {
                mapping.push({ service_id: service.id, price_id: val.id });
            }
            await ServicePriceMapping.bulkCreate(mapping);
            return res.status(200).json({ service });

        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(403).json({ message: JSON.parse(err.message) });
            }
            res.status(500).json({ error: err.message });
        }
    }


    public getServices = async (req: Request, res: Response) => {
        try {
            const category_id = req.params.categoryId;
            const services = await Service.findAll({ where: { category_id }, include: [{ model: ServicePriceMapping, include: [ServicePrice] }] })
            return res.status(200).json({ services });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    public deleteService = async (req: Request, res: Response) => {
        try {
            const category_id = req.params.categoryId;
            const service_id = req.params.serviceId;
            await ServicePriceMapping.destroy({ where: { service_id } });
            await ServicePrice.destroy({ where: { service_id } });
            await Service.destroy({ where: { id: service_id, category_id } });
            return res.status(200).json({ message: 'Service deleted succesfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    public updateService = async (req: Request, res: Response) => {
        try {
            const category_id = req.params.categoryId;
            const service_id = req.params.serviceId;
            const body = serviceSchema.parse(req.body);
            //deleting previous data
            await ServicePriceMapping.destroy({ where: { service_id } });
            await ServicePrice.destroy({ where: { service_id } });

            await Service.update({ service_name: body.service_name, type: body.type }, { where: { id: service_id } })

            const prices = body.prices;
            prices.forEach((price: any) => price['service_id'] = service_id);
            const pricesResponse = await ServicePrice.bulkCreate(prices);
            const mapping = [];
            for (let val of pricesResponse) {
                mapping.push({ service_id: service_id, price_id: val.id });
            }
            await ServicePriceMapping.bulkCreate(mapping);
            return res.status(200).json({ message : 'Updated successfully!' });

        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(403).json({ message: JSON.parse(err.message) });
            }
            res.status(500).json({ error: err.message });
        }
    }

}