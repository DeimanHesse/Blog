import axios from 'axios';
 
 
// Post API

export const addPost = async (obj) => {
    const {data} = await axios.post('http://localhost:8080/api/post', obj);
    console.log('data из APi',data)
    return data;
}

export const updatePost = async (obj) => {
    const {data} = await axios.put(`http://localhost:8080/api/post/${obj.id}`, obj);
    console.log('data из APi',data)
    return data;
}

export const delPost = async (id) => {
    console.log(id)
    const {data} = await axios.delete('http://localhost:8080/api/post/'+ id)
    return data
}
export const getPost = async (id) => {
    console.log(id)
    const {data} = await axios.get('http://localhost:8080/api/post/'+ id)
    return data
}



// User API
export const addUser = async (obj) => {
    const {data} = await axios.post('http://localhost:8080/api/user', obj);
    return data;
}


export const getUser = async (id) => {
    const {data} = await axios.get('http://localhost:8080/api/user'+id);
    return data;
}

export const check = async () => {
    const {data} = await axios.get('http://localhost:8080/api/user');
}




