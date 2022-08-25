import * as request from "./requester";

const baseUrl = 'http://localhost:3001/contact';

export const sendContactForm = (form) => request.post(baseUrl, form);