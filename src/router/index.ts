import { Router } from 'express'
import { productsController } from '@domains/products'
import { ordersController } from '@domains/orders'

export const router = Router()

router.use('/products', productsController);
router.use('/orders', ordersController);