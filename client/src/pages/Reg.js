import {useState, useContext, useEffect} from 'react';
import { AuthContext } from "../context";
// import "./reg.scss";

import {useDispatch, useSelector} from 'react-redux';

import { addUser } from '../API/postsAPI';



function Reg () {

    const dispatch = useDispatch();

    const [formInput, setFormInput] = useState ({
        name: '',
        email: ''
    });

    const {isAuth, setIsAuth} = useContext(AuthContext);

     //стейт емэйла с валидацией
     const [email, setEmail] = useState('');
     const [emailDirty, setEmailDirty] = useState(false);
     const [emailError, setEmailError] = useState('Email не может быть пустым');
 
     //стейт имени с валидацией
     const [name, setName] = useState('');
     const [nameDirty, setNameDirty] = useState(false);
     const [nameError, setNameError] = useState('Имя не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    

      //разблокировка кнопки Авторизации, если форма валидна
      useEffect(() => {
        if (nameError || emailError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
      }, [nameError, emailError])


      const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                
                break;

            case 'email':
                setEmailDirty(true)
                break;
        
            default:
                break;
        }
        
    }
    function inputHandler (e) {
        let {name, value} = e.target;
        //проверяем имя поля
        switch (name) {
            case 'name':
                //управляемый инпут: по изменению забиваем значение имя пол в стейт
                setName(value);
                //Валидируем поле на пустоту значения
                if (!value) {
                    setNameError('Имя не может быть пустым');
                } else {
                    setNameError('');
                }
                break;
            case 'email':
                setEmail(value);
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                //Валидируем поле на пустоту значения
                if (!value) {
                    setEmailError('Имя не может быть пустым');
                    //Валидируем поле на соответствие типу email
                } else if (!re.test(String(value).toLowerCase())) {
                    setEmailError('Email некорректен');
                } else {
                    setEmailError('');
                }
                break;
        
            default:
                break;
        }
    }

    function regUser () {
        let finalObj = {
            name: name,
            email:email
        }
        addUser(finalObj);
        setIsAuth(true);
        localStorage.setItem('userName' ,name);
        console.log(localStorage.getItem)
        dispatch({type: "GET_USER", payload: name})
    
    }

    return (
        <div className="reg">
            
            <div className="reg__form form-reg">
            <h1>Регистрация</h1>
                <div className="form-reg__item">
                {(nameDirty && nameError) && <div style={{color:'red'}} className="Error">{nameError}</div>}
                    <label htmlFor="name" className="form-reg__label">Введите имя</label>
                    <input onBlur={blurHandler} onChange={(e) => inputHandler(e)} value={name} name = "name" type="text" id="name" className="form-reg__input" />
                </div>
                {(emailDirty && emailError) && <div style={{color:'red'}} className="Error">{emailError}</div>}
                <div className="form-reg__item">
                    <label htmlFor="email" className="form-reg__label">Введите емэйл</label>
                    <input onBlur={blurHandler} onChange={(e) => inputHandler(e)} value={email} name = "email" type="text" id="email" className="form-reg__input" />
                </div>
                <button disabled={!formValid} onClick={() => regUser()} className="form-reg__button">Зарегистрироваться</button>
            </div>
        </div>
    )
}

export default Reg;