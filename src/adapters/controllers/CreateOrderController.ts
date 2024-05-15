import { Request, Response } from "express";
import CreateOrderUseCase from "../../usecases/CreateOrderUseCase";
export default class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  public save = async (request: Request, response: Response) => {
    const { order_title, order_description } = request.body;
    const order = await this.createOrderUseCase.execute({
      order_title,
      order_description,
    });
    return response.status(201).json(order);
  };
}
