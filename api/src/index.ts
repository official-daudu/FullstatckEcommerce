import express from "express";
import productsRouter from "./routes/products/index";

const port = 3030;
const app = express();

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
