import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderWithItemsScheme } from "../../db/schema/orders.js";
import { VerifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  VerifyToken,
  validateData(insertOrderWithItemsScheme),
  createOrder
);

export default router;
