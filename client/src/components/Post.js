import {AuthContext} from '../context';
import {useContext, useState} from "react";
import { Router } from 'react-router';
import {useHistory} from 'react-router-dom';


function Post ({id, title, content, author, pic, theme, post_date, deletePost, editPost}) {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const router = useHistory();

const [buttonsActive, setButtonsActive] = useState({
    display: 'none'
})

    return (
        <div  className="main__post post">
            
            <div className="post__picture">
               <img src={`http://88.212.253.186:35224/${pic}`} alt="" />
            </div>
            
            <div className="post__content">
                <div className="post__theme">{theme}</div>
                <div className="post__title">{title}</div>
                <div className="post__text">{content.length > 220 ?
                            `${content.substring(0, 220)}...` : content}</div>
                {/* <div className="post__text">id {id}</div> */}
                <div className="post__info">
                    <div className="post__author">{author}</div>
                    <div className="post__date">{post_date}</div>
                </div>
                
                <div className="post__buttons" >
                    <button onClick={()=> router.push(`post/${id}`)} className="post__button">читать</button>

                    {isAuth ?
                        <div className="postAuth__buttons">
                            <button onClick={()=> editPost(id, title, content, pic, theme)} className="post__button">Редактировать</button>
                            <button onClick={()=> deletePost(id)} className="post__button">Удалить</button>
                            
                        </div>
                            
                        
                        :
                        // div дл того чтоы просто восползоватс тернарным оператором
                        <div className="d" style={{display:'none'}}></div>
                
                    }
                </div>
            </div>
        </div>
    )
}

export default Post;