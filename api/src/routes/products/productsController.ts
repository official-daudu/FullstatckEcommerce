import { Request, Response } from "express";
import { db } from "../../db/index.js";

import { productsTable } from "../../db/schema/productsSchema.js";
import { eq } from "drizzle-orm";
import _ from "lodash";

export async function ListProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function GetProductById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function CreateProduct(req: Request, res: Response) {
  try {
    console.log(req.userId);
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(200).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function UpdateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;
    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function DeleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
