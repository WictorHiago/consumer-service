import client, { Channel, Connection } from "amqplib";

export class RabbitmqGateway {
  private connection: Connection;
  private channel: Channel;
  private Queue: string = "orders";

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel.assertQueue(this.Queue);
  }

  private async getConnection(): Promise<void> {
    this.connection = await client.connect(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
  }

  private async createChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
  }

  public publish = async (queue: string, message: string) => {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  };
}
