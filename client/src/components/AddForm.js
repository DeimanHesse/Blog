import {useState, useEffect} from "react";

import { addPost } from "../API/postsAPI";

import {useDispatch, useSelector} from 'react-redux';

function AddForm ({send}) {

   //Redux
   const textAuthor = useSelector(state => state.users.user);
   
   const dispatch = useDispatch();

    //стейт имени с валидацией
    const [title, setTitle] = useState('');
    const [titleDirty, setTitleDirty] = useState(false);
    const [titleError, setTitleError] = useState('Заголовок не может быть пустым');

    const [text, setText] = useState('');
    const [textDirty, setTextDirty] = useState(false);
    const [textError, setTextError] = useState('Текст не может быть пустым');

    const [theme, setTheme] = useState('Политика');
    const [themeDirty, setThemeDirty] = useState(false);
    const [themeError, setThemeError] = useState('Тема не может быть пустым');

    //стейт инпут файл
    const [file, setFile] = useState(null);

    //стейт валидности формы
    const [formValid, setFormValid] = useState(false);


    const [formState, setFormState] = useState ({
        title: title,
        text: text,
        theme: theme
        

    })

    


    const selectFile = (e) => {
        setFile(e.target.files[0]);
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true)
                
                break;

            case 'text':
                setTextDirty(true)
                break;

            case 'theme':
                setThemeDirty(true)
                break;
        
            default:
                break;
        }
        
    }

//разблокировка кнопки Авторизации, если форма валидна
useEffect(() => {
    if (titleError || textError) {
        setFormValid(false);
    } else {
        setFormValid(true);
    }
  }, [titleError, textError, themeError])


    function setPost (e) {
        e.preventDefault();
        const textAuth = localStorage.getItem('userName');
        // dispatch({type: "GET_USER", payload: textAuth});

        let date = new Date();
        let postDate = new Intl.DateTimeFormat("ru", {
            year: "numeric", 
            month: "long", 
            day: "numeric"}).format(date);
            // postDate.toDateString();  
        
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', text);
        formData.append('img', file);
        formData.append('post_date', postDate);
        formData.append('author', textAuth);
        formData.append('theme', theme);

       
        send(formData); 
        setTitle('');
        setText('');
        setTheme('');
        
    }

    
    function onChangeHandler (e) {
        let {name, value} = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                if (!value) {
                    setTitleError('Заголовок не может быть пустым');
                } else {
                    setTitleError('');
                }
                break;
            case 'text':
                setText(value);
                if (!value) {
                    setTextError('Текст не может быть пустым');
                } else {
                    setTextError('');
                }
                break;

            case 'theme':
                setTheme(value);
                console.log(value)
                
                break;
        
            default:
                break;
        }
        setFormState({...formState, [name]:value})
    }

    return (
        <div className="addForm">
            <form action="" className="form-add ">
                <div className="form-add__title">Новый пост</div>
                <div className="form-add__item">
                    {(themeDirty && themeError) && <div style={{color:'red'}} className="Error">{themeError}</div>}
                    <label htmlFor="theme" className="form-add__label">Введите тему</label>
                    {/* <input onBlur={blurHandler} onChange={(e)=> onChangeHandler(e)} value={theme} type="text" name="theme" className="form-add__input" id="theme" /> */}
                    <select value={theme} onChange={(e)=> onChangeHandler(e)} name="theme" id="theme">
                        <option value="Политика">Политика</option>
                        <option value="Искусство">Искусство</option>
                        <option value="Технологии">Технологии</option>
                    </select>
                </div>
                <div className="form-add__item">
                    {(titleDirty && titleError) && <div style={{color:'red'}} className="Error">{titleError}</div>}
                    <label htmlFor="title" className="form-add__label">Введите заголовок</label>
                    <input onBlur={blurHandler} onChange={(e)=> onChangeHandler(e)} value={title} type="text" name="title" className="form-add__input" id="title" />
                </div>
                <div className="form-add__item">
                    {(textDirty && textError) && <div style={{color:'red'}} className="Error">{textError}</div>}
                    <label htmlFor="text" className="form-add__label">Введите текст поста</label>
                    <textarea onBlur={blurHandler} onChange={(e)=> onChangeHandler(e)} value={text} type="text" name="text" className="form-add__textarea" id="text" />
                </div>
                <div className="form-add__item">
                    {/* {(textDirty && textError) && <div style={{color:'red'}} className="Error">{textError}</div>} */}
                    <label htmlFor="pic" className="form-add__label">Введите текст поста</label>
                    <input onChange={selectFile} type="file" name="pic" className="form-add__input" id="pic" />
                </div>
               
                <button disabled = {!formValid} onClick={(e) => setPost(e)} className="form-add__button">Добавить пост</button>
            </form>
        </div>
    )
}

export default AddForm;