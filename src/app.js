import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager();
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.get("/products", (req, res) => {
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
    console.log(error);
    res.send({ error: "Hubo un error al obtener los productos." });
  }
});

app.get("/products/:pid", (req, res) => {
  let { pid } = req.params;
  try {
    let product = productManager.getProductById(parseInt(pid));

    if (product) {
      res.send({ product });
    } else {
      res.json({ error: "Producto no existe." });
    }
  } catch (error) {
    console.error(error);
    res.send({ error: "Hubo un error al obtener el producto." });
  }
});

app.listen(PORT, () => {
  console.log("Servidor activo");
});
