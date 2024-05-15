import { Request, Response } from "express";
import GetAllOrdersUseCase from "../../usecases/GetAllOrdersUseCase";
export default class FindAllOrdersController {
  constructor(private getAllOrdersUseCase: GetAllOrdersUseCase) {}

  public findAll = async (request: Request, response: Response) => {
    const orders = await this.getAllOrdersUseCase.execute();
    return response.status(200).json(orders);
  };
}
