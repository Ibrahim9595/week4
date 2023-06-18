import { _fetch } from "../utils.js";

export const createProduct = async (product) => {
  return _fetch("https://api.escuelajs.co/api/v1/products/", "POST", {
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchProducts = async () =>
  _fetch("https://api.escuelajs.co/api/v1/products?offset=1&limit=10");
