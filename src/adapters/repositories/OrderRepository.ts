import { IOrderRepository } from "./IOrderRepository";
import Order from "../../entities/Order";
import pool from "../database";

class OrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO orders (id,order_title, order_description, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [order.id, order.order_title, order.order_description, order.status]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<Order | null> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM orders WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Order[]> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM orders");
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default OrderRepository;
