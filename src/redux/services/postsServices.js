import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5002' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization =  `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchAllPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id,updatePost) => API.put(`/posts/${id}`, updatePost);
export const likePost = (id, type) => API.put(`/posts/${id}/likePost`, type);
export const commentPost = (comment, id) => API.put(`/posts/${id}/commentPost`, { comment });

export const deletePost = (id) => API.delete(`/posts/${id}`);




// const baseUrl = "http://localhost:5000/";

// eslint-disable-next-line import/no-anonymous-default-export
// export default {
//     posts(url = baseUrl+'posts/')
//     {
//         return {
//             getAll: () => axios.get(url),
//             create: newPost => axios.post(url, newPost),
//             update: (id, updatePost) => axios.put(url+id, updatePost),
//             delete: id => axios.delete(url+id),
//             likePost: (id) => axios.patch(url+id+'/likePost'),
//         }
//     }
// }