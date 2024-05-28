import { PrismaClient } from "@prisma/client";
import { CreateOrderDTO, GetOrderDTO } from "../dto";

export class OrdersRepository {
    constructor(private readonly db: PrismaClient) {}

    async getOrders(): Promise<GetOrderDTO[]> {
        const orders = await this.db.order.findMany({
            select: {
                id: true,
                totalPrice: true,
                products: {
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true
                            }
                        },
                    }
                }
            }
        });
        return orders.map(order => new GetOrderDTO(order));
    }

    async createOrder(data: CreateOrderDTO): Promise<void> {
        await this.db.order.create({
            data: {
                products: {
                    create: data.products.map(product => ({
                        quantity: product.quantity,
                        product: {
                            connect: {
                                id: product.productId
                            }
                        }
                    }))
                },
                totalPrice: data.totalPrice
            }
        })
    }

}