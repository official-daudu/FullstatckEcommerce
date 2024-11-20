import { Request, Response } from "express";

export function ListProducts(req: Request, res: Response) {
  res.send("ListProducts");
}

export function GetProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("GetProductById");
}

export function CreateProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send("CreateProduct");
}

export function UpdateProduct(req: Request, res: Response) {
  res.send("UpdateProduct");
}

export function DeleteProduct(req: Request, res: Response) {
  res.send("DeleteProduct");
}
