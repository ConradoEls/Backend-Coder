import { promises as fs } from "fs";

export default class CartManager {
  constructor() {
    this.path = "./carts.json";
  }

  // CONSTANTE PARA LEER EL ARCHIVO carts.json
  // const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));

  async addCart() {
    // LEE EL ARCHIVO carts.json
    // BUSCA EL ULTIMO Y/O SI EXISTE EL ID
    // SI NO EXISTE, BUSCA EL ULTIMO CARRITO DEL ARRAY Y LE ASIGNA UN ID

    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0;
    const newCart = { id: lastCartId + 1, products: [] };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts));
  }

  async getCartById(id) {
    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const findedCart = carts.find((cart) => cart.id === id);

    if (findedCart) {
      return findedCart.products;
    } else {
      console.log("Carrito no encontrado");
    }
  }

  async addProduct(cid, pid) {
    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    // BUSCA EL INDICE DEL CARRITO EN EL ARRAY POR EL CID PROVISTO POR PARAMETRO
    const indice = carts.findIndex((cart) => cart.id === cid);

    // SI EL I EXISTE, BUSCA EL CARRITO[I]
    if (indice !== -1) {
      const findedCart = carts[indice];
      // BUSCA EL INDICE DEL PRODUCTO EN EL ARRAY POR EL PID PROVISTO POR PARAMETRO
      const productIndex = findedCart.products.findIndex(
        (prod) => prod.product === pid
      );

      // SI EL I EXISTE, LE SUMA UNA CANTIDAD AL PRODUCTO EXISTENTE EN EL ARRAY
      // NO EXISTE, LO AGREGA AL ARRAY PRODUCTS CON CANTIDAD 1 POR DEFECTO
      if (productIndex !== -1) {
        findedCart.products[productIndex].quantity++;
      } else {
        findedCart.products.push({ product: pid, quantity: 1 });
      }

      await fs.writeFile(this.path, JSON.stringify(carts));
      return true;
    } else {
      console.log("Carrito no encontrado");
    }
  }
}
