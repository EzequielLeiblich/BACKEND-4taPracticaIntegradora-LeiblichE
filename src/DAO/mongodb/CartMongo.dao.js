import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import {ticketModel} from "./models/ticket.model.js";
import config from "../../config.js";

export default class CartsDAO {

  // MONGOOSE
  connection = mongoose.connect( config.MONGO_URL );

  async createCart() {
    let response = {};
    try {
      const result = await cartModel.create({
        products: [],
        tickets: []
      });
      response.status = "success";
      response.result = result;
    } catch (error) {
      response.status = "error";
      response.message = "Error al crear el carrito - DAO: " + error.message;
    }
    return response;
  };

  async getCartById(cid) {
    let response = {};
    try {
      const result = await cartModel.findOne({
        _id: cid
      }).populate(['products.product', 'tickets.ticketsRef']);
      if (result === null) {
        response.status = "not found cart";
      } else {
        response.status = "success";
        response.result = result;
      };
    } catch (error) {
      response.status = "error";
      response.message = "Error al obtener el carrito por ID - DAO: " + error.message;
    };
    return response;
  };

  async getAllCarts() {
    let response = {};
    try {
        const result = await cartModel.find();
        if (result.length === 0) {
            response.status = "not found carts";
        } else {
            response.status = "success";
            response.result = result;
        };
    } catch (error) {
        response.status = "error";
        response.message = "Error al obtener todos los carritos - DAO: " + error.message;
    };
    return response;
  };

  async addProductToCart(cid, product, quantity) {
    let response = {};
    try {
      const cart = await this.getCartById(cid);
      if (cart.result === null) {
        response.status = "not found cart";
      } else {
        const productID = product._id.toString();
        const existingProductIndex = cart.result.products.findIndex(p => p.product._id.toString() === productID);
        if (existingProductIndex !== -1) {
          cart.result.products[existingProductIndex].quantity += parseInt(quantity, 10);
          await cart.result.save();
          response.status = "success";
          response.result = cart;
        } else {
          cart.result.products.push({
            product: product,
            quantity: quantity
          });
          await cart.result.save();
          response.status = "success";
          response.result = cart;
        };
      };
    } catch (error) {
      response.status = "error";
      response.message = "Error al agregar el producto al carrito - DAO: " + error.message;
    };
    return response;
  };


  async addTicketToCart(cid, ticketID) {
    let response = {};
    try {
        const cart = await this.getCartById(cid);
        if (cart.result === null) {
            response.status = "not found cart";
        } else {
            cart.result.tickets.push({ ticketsRef: ticketID });
            await cart.result.save();
            response.status = "success";
            response.result = cart;
        };
    } catch (error) {
        response.status = "error";
        response.message = "Error al agregar el ticket al carrito - DAO: " + error.message;
    };
    return response;
  };

  async deleteProductFromCart(cid, pid) {
    let response = {};
    try {
      const cart = await this.getCartById(cid);
      if (cart.result === null) {
        response.status = "not found cart";
      } else {
        const product = cart.result.products.find((p) => p._id.toString() === pid);
        if (product === undefined) {
          response.status = "not found product";
        } else {
          cart.result.products.pull(pid);
          await cart.result.save();
          response.status = "success";
          response.result = cart;
        };
      };
    } catch (error) {
      response.status = "error";
      response.message = "Error al borrar el producto en carrito - DAO: " + error.message;
    };
    return response;
  };

  async updateProductInCart(cid, pid, updatedProdInCart) {
    try {
      const cart = await this.getCartById(cid);
      const product = cart.products.find((p) => p._id.toString() === pid);
      if (!product) {
        throw new Error(`No se encontró ningún producto con el ID ${pid} en el carrito.`);
      }
      product.quantity = updatedProdInCart.quantity;
      await cart.save();
      return {
        cart
      };
    } catch (error) {
      throw new Error("Error al actualizar producto en carrito - DAO. Original error: " + error.message);
    }
  };

  async deleteAllProductsFromCart(cid) {
    let response = {};
    try {
      const cart = await this.getCartById(cid);
      if (cart.result === null) {
        response.status = "not found cart";
      } else if (cart.status === "success") {
        cart.products = [];
        await cart.result.save();
        response.status = "success";
        response.result = cart;
      };
    } catch (error) {
      response.status = "error";
      response.message = "Error al eliminar todos los productos del carrito - DAO: " + error.message;
    };
    return response;
  };

  async updateCart(cid, updatedCartFields) {
    let response = {};
    try {
      let cart = await cartModel.updateOne({
        _id: cid
      }, {
        $set: updatedCartFields
      });
      if (result.matchedCount === 0) {
        response.status = "not found cart";
      } else if (result.matchedCount === 1) {
        await cart.result.save();
        response.status = "success";
        response.result = cart;
      };
    } catch (error) {
      response.status = "error";
      response.message = "Error al actualizar el carrito - DAO: " + error.message;
    };
    return response;
  };

  async updateProductInCart(cid, pid, quantity) {
    let response = {};
    try {
      const cart = await this.getCartById(cid);
      if (cart.result === null) {
        response.status = "not found cart";
      } else {
        const product = cart.result.products.find((p) => p._id.toString() === pid);
        if (product === undefined) {
          response.status = "not found product";
        } else {
          product.quantity = quantity;
          await cart.result.save();
          response.status = "success";
          response.result = cart;
        };
      };
    } catch (error) {
      response.status = "error";
      response.message = "Error al actualizar producto en carrito - DAO: " + error.message;
    };
    return response;
  };
}