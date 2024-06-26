import { BadRequestException, BodyValidation, db } from '@utils';
import { Request, Response, Router } from 'express'
import { OrdersService } from '../service';
import { OrdersRepository } from '../repository';
import httpStatus from 'http-status';
import { GetOrderDTO, CreateOrderDTO } from '../dto';

export const ordersController = Router();

const service: OrdersService = new OrdersService(new OrdersRepository(db))

ordersController.get('/', async(req: Request, res: Response, next) => {
  try {
    const orders: GetOrderDTO[] = await service.getOrders();
    return res.status(httpStatus.OK).json(orders);
  } catch (error) {
    next(error);
  }
});
  
ordersController.post('/', BodyValidation(CreateOrderDTO),  async(req: Request, res: Response, next) => {
  try {
    const data = req.body;
    await service.createOrder(data);
    return res.status(httpStatus.CREATED).json();
  } catch (error) {
    next(error);
  }
});