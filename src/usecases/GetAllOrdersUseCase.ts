import CustomException from "../adapters/middlewares/CustomException";
import { IOrderRepository } from "../adapters/repositories/IOrderRepository";

export default class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute() {
    const orders = await this.orderRepository.findAll();
    if (!orders) {
      throw new CustomException("Orders not found", 404);
    }
    return orders;
  }
}
