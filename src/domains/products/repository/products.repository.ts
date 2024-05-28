import { PrismaClient } from "@prisma/client";
import { CreateProductDTO, GetProductDTO } from "../dto";

export class ProductsRepository {
    constructor(private readonly db: PrismaClient) {}

    async getProducts(): Promise<GetProductDTO[]> {
        const products = await this.db.product.findMany({
            select: {
              id: true,
              name: true,
              price: true
            }
        });
        return products.map(product => new GetProductDTO(product));
    }

    async createProduct(data: CreateProductDTO): Promise<void> {
        await this.db.product.create({
            data: {
                ...data
            }
        });
    }

}