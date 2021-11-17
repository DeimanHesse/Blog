// import "./blog.scss";
import {useState, useEffect} from 'react';
import Post from "../components/Post";
import AddForm from '../components/AddForm';
import EditForm from '../components/EditForm';

import Modal from '../components/modal/Modal';

import axios from 'axios';

import React from "react";



//API
import { addPost, updatePost ,delPost, getUser } from '../API/postsAPI';

//Context
import {useContext} from "react";
import { AuthContext } from '../context';

//Redux
import {useDispatch, useSelector} from 'react-redux';


function Main () {
    
    const {isAuth, setIsAuth} = useContext(AuthContext)

    //Redux
    const dispatch = useDispatch();
    const stateGlobal = useSelector(state => state.posts.posts);
    const stateGeneral = useSelector(state => state);
    
    const [specialSate, setSpecialSate] = useState([]); 

    // GET-запрос в азу
    useEffect(() => {
        axios.get('http://88.212.253.186:35224/api/post')
        .then(res => res.data.sort((prev, next) => next.id - prev.id))
        .then(data => dispatch ({type: "GET_POSTS", payload: data}));
        // .then(data => setSortState(data))
       
    
    }, [])

    useEffect(() => {
       setSpecialSate(stateGlobal)
    }, [stateGlobal]);


    //стейт от модалки
    const [active, setActive] = useState(false);
    //стейт дл помещени данных в форму с модалкой - вызываетс по клику на кнопку Редактироват (функци editPost - передаётс в компонент с постом)
    const [fastState, setFastState] = useState({
        title: '',
        content: '',
        author: '',
        theme: '',
        file: null
    });


    //Стейт сортировки

    

    const sortArr = useSelector(state => state.posts.posts);
    // const sortState = useSelector(state => state.posts.posts);

    // Сортировка
    const sort = (e) => {
        if (e.target.value === 'Все') {
            setSpecialSate(stateGlobal);
        } else {
            let sortArrFinal = sortArr.filter(ite => ite.theme === e.target.value);
            setSpecialSate(sortArrFinal)
        }
    }

   


    const [addFormVisible, setAddFormVisible] = useState(false)
   

    
    async function addPostTop (formData) {
        


        //функци из папки API
        addPost(formData)
        .then(data => dispatch ({type: "ADD_POST", payload: data}));
        
    }

    function deletePost (id) {
    
      //функци из API  
      delPost(id);  
      dispatch ({type: "DELETE_POST", payload: stateGlobal.filter(item => id !== item.id)});
       
        
    }

    function editPost (id,title, content, pic, theme) {
        console.log(content)
        
        const editedPost = {
            id: id,
            title: title,
            content: content,
            theme: theme,
            img: pic


        }
        //данные из временного стейта попадают в форму в модалке, ерутс из формстейта в компоненте формы
        setFastState(editedPost)
        setActive(true)
    }

   async function changePost (obj) {
       console.log(obj.id)
        let arr = [];

        //сделал копию массива из стейта
        for (let index = 0; index < stateGlobal.length; index++) {
                const element = stateGlobal[index];
                let objCopy = Object.assign({}, element)
                arr.push(objCopy)
            }

            const formData = new FormData();
        
        //переписал данные у оъекта с нужным айдишником   
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.id === obj.id) {
                element.title = obj.title;
                element.content = obj.content;
               element.author = obj.author;
                element.theme = obj.theme;

                formData.append('id', obj.id);
                formData.append('title', obj.title);
                formData.append('content', obj.content);
                formData.append('theme', obj.theme);
               
                //если файл доавлен
                if (obj.file) {
                    formData.append('img', obj.file);
                    formData.append('oldImg', obj.img);
                } else {
                    formData.append('oldImg', obj.img);
                }
                console.log(element)
                
                
            }
        }
        
        setActive(false)
        // dispatch ({type: "UPDATE_POST", payload: arr});

        console.log(formData);

        updatePost(formData)
        .then(data => dispatch ({type: "UPDATE_POST", payload: data}))
        // .then(data => console.log('res' ,data));

        // const res = await fetch(`http://localhost:8080/api/post/${obj.id}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-type" : "application/json"
        //         },
        //         body: formData
        //     });
    
        //     if (!res.ok) {
        //         throw new Error (`Could not fetch http://localhost:8080/api/post}`);
        //     }
            setActive(false)
            
            // return res.json();
        }

 
    return (
        <div className="main">
            <div className="main__wrapper">
           {isAuth ? 
                <AddForm send = {addPostTop}/>
                :
                <div className="dfdf"></div>
            }
            
            <div className="main__filterBtnBlock">
                <button className="main__filterBtn" onClick={(e) =>sort(e)} value="Политика">Политика</button>
                <button className="main__filterBtn" onClick={(e) =>sort(e)} value="Искусство">Искусство</button>
                <button className="main__filterBtn" onClick={(e) =>sort(e)} value="Технологии">Технологии</button>
                <button className="main__filterBtn" onClick={(e) =>sort(e)} value="Все" >Все</button>
               
            </div>
  
           
            <div className="main__posts">
                {specialSate.map(item => {
                    return (
                        <Post 
                        editPost = {editPost} 
                        deletePost={deletePost} 
                        key={item.id} 
                        dataId={item.data_id} 
                        id = {item.id} 
                        title={item.title} 
                        content={item.content} 
                        author={item.author}
                        pic={item.img}
                        theme={item.theme}
                        post_date={item.post_date}
                        
                        />    
                    )
                })}
            </div>
            <Modal active = {active} setActive={setActive}>
                <EditForm 
                    fastState={fastState} 
                    send={changePost}
                    setActive={setActive}
                    />
            </Modal>
            </div>
        </div>
    )
}

export default Main;