import * as request from "./requester";

const baseUrl = 'http://localhost:3001/cart/';

export const addToCart = (product) => request.post(baseUrl, product);
export const updateCart = (product) => request.patch(baseUrl, product);
export const getOne = (cartId) => request.get(`${baseUrl}/${cartId}`);
export const removeCart = (cartId) => request.del(`${baseUrl}/${cartId}`);