import {useState, useEffect} from "react";

function EditForm ({fastState ,send, setActive}) {

     //стейт инпут файл
     const [file, setFile] = useState(null);

    const [formState, setFormState] = useState ({
        title: '',
        content: '',
        theme: '',
        file: ''
    })

   

    useEffect(() => {
       setFormState(fastState)
    console.log(fastState)
    }, [fastState]);

    function setPost (e) {
        e.preventDefault();
        const newPost = {...formState}
        send(newPost);
        setFormState({
        title:'',
        content: '',
        file: '',
        theme: ''
        
    })
        console.log('newPost',newPost)
    }

    function onChangeHandler (e) {
        let {name, value} = e.target;
        setFormState({...formState, [name]:value})
    }

    const selectFile = (e) => {
        setFile(e.target.files[0]);
        setFormState({...formState, file: e.target.files[0]})
        console.log(e.target.files[0])
    }

    const showState = (e) => {
        e.preventDefault();
        console.log('formState',formState)

    }
    const cancelPost = (e) => {
        e.preventDefault();
        setActive(false);
        

    }

    

    return (
        <div className="blogFormEdit">
            <form action="" className="blogFormEdit__form">
                <div className="editForm__item">
                    <label htmlFor="title" className="editForm__label">Введите заголовок</label>
                    <input onChange={(e)=> onChangeHandler(e)} value={formState.title} type="text" name="title" className="editForm__input" id="title" />
                </div>
                <div className="editForm__item">
                    <label htmlFor="text" className="editForm__label">Введите текст поста</label>
                    <textarea onChange={(e)=> onChangeHandler(e)} value={formState.content} type="text" name="content" className="editForm__textarea" id="text" />
                </div>
                <div className="editForm__item">
                    {/* {(themeDirty && themeError) && <div style={{color:'red'}} className="Error">{themeError}</div>} */}
                    <label htmlFor="theme" className="editForm__label">Введите тему</label>
                    {/* <input onBlur={blurHandler} onChange={(e)=> onChangeHandler(e)} value={theme} type="text" name="theme" className="form-add__input" id="theme" /> */}
                    <select value={formState.theme} onChange={(e)=> onChangeHandler(e)} name="theme" id="theme">
                        <option value="Политика">Политика</option>
                        <option value="Искусство">Искусство</option>
                        <option value="Технологии">Технологии</option>
                    </select>
                </div>
                
                <div className="form__item">
                    {/* {(textDirty && textError) && <div style={{color:'red'}} className="Error">{textError}</div>} */}
                    <label htmlFor="pic" className="form__label">Выерите файл</label>
                    <input onChange={selectFile} type="file" name="pic" className="form__input" id="pic" />
                </div>
              
                <button onClick={(e) => setPost(e)} className="editForm__button">Сохранить</button>
                <button onClick={(e) => cancelPost(e)} className="editForm__button">Отмена</button>
                <button onClick={(e) => showState(e)} className="editForm__button">faststate</button>
            </form>
        </div>
    )
}

export default EditForm;