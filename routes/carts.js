import express from 'express';
import ProductManager from "./ProductManager.js";

const cartsRouter = express.Router();
const productManager = new ProductManager();

cartsRouter.post();
cartsRouter.put();
cartsRouter.delete();

export default cartsRouter;