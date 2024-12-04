import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertOrderWithItemsScheme,
  updateOrderSchema,
} from "../../db/schema/orders.js";
import { VerifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  VerifyToken,
  validateData(insertOrderWithItemsScheme),
  createOrder
);

router.get("/", VerifyToken, listOrders);

router.get("/:id", VerifyToken, getOrder);

router.put("/:id", VerifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
