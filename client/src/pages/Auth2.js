import "./auth.scss";
import {useContext, useState, useEffect} from "react";
import { AuthContext } from "../context";

import axios from 'axios';

//Redux
import {useDispatch, useSelector} from 'react-redux';

function Auth () {
    const [formInput, setFormInput] = useState ({
        name: '',
        email: ''
    });

    //стейт емэйла с валидацией
    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');

    //стейт имени с валидацией
    const [name, setName] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState('Имя не может быть пустым');

    //стейт валидности формы
    const [formValid, setFormValid] = useState(false);



    const {isAuth, setIsAuth} = useContext(AuthContext);

    const dispatch = useDispatch();

    function login (e) {
        // setIsAuth(true);
        check(name);
    }

    async function check (name) {
        const {data} = await axios.get('http://88.212.253.186:35224/api/user');
        data.forEach(element => {
            if (element.name == name ) {
                setIsAuth(true);
                localStorage.setItem('id' ,element.id);
                localStorage.setItem('userName' ,element.name);
                console.log(localStorage)
                dispatch({type: "GET_USER", payload: element.name})
    
            } else {
                console.log ('инах!')
            }
        });
        console.log(data);
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

    //разблокировка кнопки Авторизации, если форма валидна
    useEffect(() => {
      if (nameError || emailError) {
          setFormValid(false);
      } else {
          setFormValid(true);
      }
    }, [nameError, emailError])

   

    //присвоение полю события покидания поля, активируется при первом покидании
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

    return (
        <div className="auth">
            
            <div className="auth__form form-auth">
                <div className="form-auth__title">
                    <h1>Вход</h1>
                </div>
                <div className="form-auth__item">
                
                {(nameDirty && nameError) && <div style={{color:'red'}} className="Error">{nameError}</div>}
                    <label htmlFor="name" className="form-auth__label">Введите имя</label>
                    <input onBlur={blurHandler} onChange={(e) => inputHandler(e)} value={name} name = "name" type="text" id="name" className="form-auth__input" />
                </div>
                <div className="form-auth__item">
                {(emailDirty && emailError) && <div style={{color:'red'}} className="Error">{emailError}</div>}
                    <label htmlFor="email" className="form-auth__label">Введите емэйл</label>
                    <input onBlur={blurHandler}  onChange={(e) => inputHandler(e)} value={email} name = "email" type="text" id="email" className="form-auth__input" />
                </div>
                <button disabled = {!formValid} onClick = {() => login()} className="form-auth__button">Войти</button>
            </div>
        </div>
    )
}

export default Auth;