import * as request from "./requester";

const baseUrl = 'http://localhost:3001/products';

export const getAll = () => request.get(baseUrl);
export const getOne = (productId) => request.get(`${baseUrl}/${productId}`);
export const create = (product) => request.post(baseUrl, product);
export const edit = (product, productId) => request.put(`${baseUrl}/${productId}`, product);
export const remove = (productId) => request.del(`${baseUrl}/${productId}`);