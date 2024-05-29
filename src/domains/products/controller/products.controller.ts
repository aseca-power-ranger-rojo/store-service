import { BodyValidation, db } from '@utils';
import { Request, Response, Router } from 'express'
import { CreateProductDTO, GetProductDTO } from '../dto';
import httpStatus from 'http-status';
import { ProductsService } from '../service';
import { ProductsRepository } from '../repository';

export const productsController = Router();

const service: ProductsService = new ProductsService(new ProductsRepository(db))

productsController.get('/',  async(req: Request, res: Response, next) => {
    try{
      const products: GetProductDTO[] = await service.getProducts();
      return res.status(httpStatus.OK).json(products);
    }catch(error){
      next(error);
    }
  });
  
productsController.post('/', BodyValidation(CreateProductDTO), async(req: Request, res: Response, next) => {
  try {
    const data = req.body;
    await service.createProduct(data);
    return res.status(httpStatus.CREATED).json();
  } catch (error) {
    next(error);
  }
});
