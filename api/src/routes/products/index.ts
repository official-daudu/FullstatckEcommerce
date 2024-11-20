import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetProductById,
  ListProducts,
  UpdateProduct,
} from "./productsController";

const router = Router();

router.get("/", ListProducts);

router.get("/:id", GetProductById);

router.post("/", CreateProduct);

router.put("/:id", UpdateProduct);

router.delete("/:id", DeleteProduct);

export default router;
