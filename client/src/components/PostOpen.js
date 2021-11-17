import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import { getPost } from "../API/postsAPI";

import './postOpen.scss';

function PostOpen () {
    const baseURL = process.env.REACT_APP_API_URL;

    const params = useParams();

    const [postState, setPostState] = useState([]);

    console.log('параметры',params)
    useEffect(() => {
        getPost(params.id)
            .then(data => setPostState(data))
    }, []);

   console.log(postState.img)

    return (
        <div className="postOpen">
            <div className="postOpen__wrapper">
                <div className="postOpen__picture">
                    <img src={`${baseURL}/${postState.img}`} alt="" />
                </div>
                <div className="postOpen__title">{postState.title}</div>
                <div className="postOpen__content">{postState.content}</div>
                <div className="post__info">
                    <div className="postOpen__author">{postState.author}</div>
                    <div className="postOpen__date">21-08-2021</div>
                </div>
            </div>
            
        </div>
    )
}

export default PostOpen;