import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products/index.js";
import authRouters from "./routes/auth/index.js";

const port = 3030;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", productsRouter);
app.use("/auth", authRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
