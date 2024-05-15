import { Request, Response } from "express";
import GetOrderUseCase from "../../usecases/GetOrderUseCase";

export default class FindOneOrderController {
  constructor(private getOrderUseCase: GetOrderUseCase) {}

  public findOne = async (request: Request, response: Response) => {
    const { id } = request.params;
    const order = await this.getOrderUseCase.execute(id);
    if (!order) {
      return response.status(404).json({ message: "Order not found" });
    }
    return response.status(200).json(order);
  };
}
