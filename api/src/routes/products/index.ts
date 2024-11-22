import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetProductById,
  ListProducts,
  UpdateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";

import { productsTable } from "../../db/productsSchema";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";
// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number(),
// });

// type productType = z.infer<typeof createProductSchema>;

const router = Router();

router.get("/", ListProducts);

router.get("/:id", GetProductById);

router.post("/", validateData(createProductSchema), CreateProduct);

router.put("/:id", validateData(updateProductSchema), UpdateProduct);

router.delete("/:id", DeleteProduct);

export default router;
