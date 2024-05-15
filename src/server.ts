import "express-async-errors"; // resolve errors in async functions
import "dotenv/config";
import express from "express";
import orderRoutes from "./adapters/http/orderRoutes";
import pool from "./adapters/database";
import { RabbitmqGateway } from "./gateways/RabbitmqGateway";
import handlerError from "./adapters/middlewares/handlerError";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = process.env.PORT_SERVER;
const rabbitmqGateway = new RabbitmqGateway();

app.use(cors({ origin: "*", methods: "GET,POST" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(orderRoutes);
app.use(handlerError);

const startServer = async () => {
  try {
    await pool.query("SELECT 1 + 1 AS result");
    console.log("Database connected");
    await rabbitmqGateway.init();

    app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
