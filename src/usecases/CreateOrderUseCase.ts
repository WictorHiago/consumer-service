import { v4 as uuidv4 } from "uuid";
import CreateUserDTO from "../adapters/dto/CreateUserDTO";
import { IOrderRepository } from "../adapters/repositories/IOrderRepository";
import CustomException from "../adapters/middlewares/CustomException";
import { RabbitmqGateway } from "../gateways/RabbitmqGateway";

class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(data: CreateUserDTO) {
    const { order_title, order_description } = data;

    if (!order_title || !order_description) {
      throw new CustomException("Missing required fields", 400);
    }

    const newOrder = {
      id: uuidv4(),
      order_title,
      order_description,
      status: "pending",
    };

    await this.orderRepository.create(newOrder);

    const rabbitmqGateway = new RabbitmqGateway();
    await rabbitmqGateway.init();
    await rabbitmqGateway.publish("wh_orders", JSON.stringify(newOrder));

    return newOrder;
  }
}

export default CreateOrderUseCase;
