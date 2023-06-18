import { createProduct } from "../models/products.js";
import { categorizeProducts } from "../services/product-categorization.js";

export const createProductController = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.send({ newProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

export const getProductsController = async (req, res) => {
  const cur = req.query.cur;

  if (cur) {
    return res.json(await categorizeProducts(cur));
  }

  res.status(400).send("BAD Request");
};
