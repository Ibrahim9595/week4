import express, { json } from "express";

import { validateProduct } from "./services/validate-product.js";
import { _fetch } from "./utils.js";
import { createProductController, getProductsController } from "./controllers/products.js";

const app = express();
app.use(json());

app.get("/products", getProductsController);
app.post("/products", validateProduct, createProductController);

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
