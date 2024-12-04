import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export const insertOrderItemsSchema = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,
});

export const insertOrderWithItemsScheme = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemsSchema),
});

// export const insertOrdersWithItemsSchema = createInsertSchema(
//   ordersTable
// ).extend({
//   items: createInsertSchema(orderItemsTable).array(),
// });
