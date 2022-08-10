import * as request from "./requester";

const baseUrl = 'http://localhost:3001/order';

export const completeOrder = (cart) => request.post(baseUrl, cart);
export const getUserOrders = (userId) => request.get(baseUrl, userId);