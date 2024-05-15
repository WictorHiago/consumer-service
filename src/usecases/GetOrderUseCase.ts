import CustomException from "../adapters/middlewares/CustomException";
import { IOrderRepository } from "../adapters/repositories/IOrderRepository";

class GetOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: string) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new CustomException("Order not found", 404);
    }

    return order;
  }
}

export default GetOrderUseCase;
