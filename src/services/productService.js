import * as request from "./requester";

const baseUrl = 'http://localhost:3001/products';

export const getAll = () => request.get(baseUrl);
export const getOne = (productId) => request.get(`${baseUrl}/${productId}`);