import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetProductById,
  ListProducts,
  UpdateProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";

import { productsTable } from "../../db/schema/productsSchema";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/schema/productsSchema";
import { VerifySeller, VerifyToken } from "../../middlewares/authMiddleware";
// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number(),
// });

// type productType = z.infer<typeof createProductSchema>;

const router = Router();

router.get("/", ListProducts);

router.get("/:id", GetProductById);

router.post(
  "/",
  VerifyToken,
  VerifySeller,
  validateData(createProductSchema),
  CreateProduct
);

router.put(
  "/:id",
  VerifyToken,
  VerifySeller,
  validateData(updateProductSchema),
  UpdateProduct
);

router.delete("/:id", VerifyToken, VerifySeller, DeleteProduct);

export default router;
