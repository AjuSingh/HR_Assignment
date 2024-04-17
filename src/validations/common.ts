import { z } from 'zod';


export const categorySchema = z.object({
    category_name: z.string({ required_error: 'Please enter valid category name' })
});

export const serviceSchema = z.object({
    service_name: z.string({ required_error: 'Please enter valid service name' }),
    type: z.enum(['Normal', 'Vip'], { required_error: 'Please enter valid type' }),
    prices: z.array(z.object({
        duration: z.number({ required_error: 'Please enter valid duration' }),
        price: z.number({ required_error: 'Please enter valid duration' }),
        type: z.enum(['Hourly', 'Weekly', 'Monthly'], { required_error: 'Please enter valid type' })
    })
    , { required_error: 'Please enter valid prices' }),
})

