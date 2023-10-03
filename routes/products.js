import express from "express";
import ProductManager from "../src/ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get("/", (req, res) => {
  try {
    let { limit } = req.query;
    let products = productManager.getProducts();

    if (limit) {
      let limitProduct = products.slice(0, parseInt(limit));
      res.send({ productsLimited: limitProduct });
    } else {
      res.send({ products });
    }
  } catch (error) {
    res.status(400).send({ status: "error", error: "Ocurrio un error" });
  }
});

productsRouter.get("/:pid", (req, res) => {
  let { pid } = req.params;
  try {
    let product = productManager.getProductById(parseInt(pid));

    if (product) {
      res.send({ product });
    } else {
      res.json({ error: "Producto no existe." });
    }
  } catch (error) {
    res.status(400).send({ status: "error", error: "Ocurrio un error" });
  }
});

productsRouter.post("/", (req, res) => {
  try {
    productManager.addProduct(req.body);
    res.send(req.body);
  } catch (error) {
    res.status(400).send({ status: "error", error: "Ocurrio un error" });
  }
});

productsRouter.put("/:id", (req, res) => {
  const pid = req.params.id;
  let idInt = parseInt(pid);
  try {
    productManager.updateProduct(idInt, req.body);
    res.send(req.body);
  } catch (error) {
    res.status(400).send({ status: "error", error: "Ocurrio un error" });
  }
});

productsRouter.delete("/:id", (req, res) => {
  const pid = req.params.id;
  let idInt = parseInt(pid);
  try {
    productManager.deleteProduct(idInt);
    res.send({message:"Producto eliminado"});
  } catch (error) {
    res.status(400).send({ status: "error", error: "Ocurrio un error" });
  }
});

export default productsRouter;
