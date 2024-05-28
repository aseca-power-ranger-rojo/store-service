import { CreateProductDTO, GetProductDTO } from "../dto";
import { ProductsRepository } from "../repository";


export class ProductsService {
    constructor(private readonly repository: ProductsRepository) {}

    async getProducts(): Promise<GetProductDTO[]> {
        return await this.repository.getProducts();
    }

    async createProduct(data: CreateProductDTO): Promise<void> {
        await this.repository.createProduct(data);
    }
}