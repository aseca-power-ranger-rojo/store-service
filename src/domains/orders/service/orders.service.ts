import axios from "axios";
import { CreateOrderDTO, GetOrderDTO } from "../dto";
import { OrdersRepository } from "../repository";

const controlTowerURL = process.env.CONTROL_TOWER_URL + '/api/orders';

export class OrdersService {
  constructor(private readonly repository: OrdersRepository) {}

  async getOrders(): Promise<GetOrderDTO[]> {
    return await this.repository.getOrders();
  }

  async createOrder(data: CreateOrderDTO): Promise<void> {
    const order = await this.repository.createOrder(data);
    await axios.post(controlTowerURL, {
      orderId: order.id
    });
  }

}