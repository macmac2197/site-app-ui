import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5002' });

export const userSignIn = (authData) => API.post('/auth/signin', authData);
export const userSignUp = (authData) => API.post('/auth/signup', authData);