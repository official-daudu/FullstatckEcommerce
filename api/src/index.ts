import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index.js";
import authRouters from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";
import serverless from "serverless-http";

const port = 8080;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", productsRouter);
app.use("/auth", authRouters);
app.use("/orders", ordersRoutes);

const env = process.env.NODE_ENV || "development";

if (env === "development") {
  app.listen(port, () => {
    console.log(process.env.NODE_ENV);
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
