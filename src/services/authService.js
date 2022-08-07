import * as request from "./requester";

const baseUrl = 'http://localhost:3001/auth';

export const login = (username, password) => 
    request.post(`${baseUrl}/login`, { username, password });


export const logout = async (token) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': token
            }
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const register = (username, password) =>
    request.post(`${baseUrl}/register`, {username, password});