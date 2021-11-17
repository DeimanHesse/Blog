import axios from 'axios';
 
const baseURL = process.env.REACT_APP_API_URL;
 
// Post API

export const addPost = async (obj) => {
    const {data} = await axios.post(`${baseURL}/api/post`, obj);
    console.log('data из APi',data)
    return data;
}

export const updatePost = async (obj) => {
    const {data} = await axios.put(`${baseURL}/api/post/${obj.id}`, obj);
    console.log('data из APi',data)
    return data;
}

export const delPost = async (id) => {
    console.log(id)
    const {data} = await axios.delete(`${baseURL}/api/post/`+ id)
    return data
}
export const getPost = async (id) => {
    console.log(id)
    const {data} = await axios.get(`${baseURL}/api/post/`+ id)
    return data
}



// User API
export const addUser = async (obj) => {
    const {data} = await axios.post(`${baseURL}/api/user`, obj);
    return data;
}


export const getUser = async (id) => {
    const {data} = await axios.get(`${baseURL}/api/user`+id);
    return data;
}

export const check = async () => {
    const {data} = await axios.get(`${baseURL}/api/user`);
}




