// import "./auth.scss";
import {useContext, useState} from "react";
import { AuthContext } from "../context";

import axios from 'axios';

function Auth () {
    const [formInput, setFormInput] = useState ({
        name: '',
        email: ''
    });


    const {isAuth, setIsAuth} = useContext(AuthContext);

    function login (e) {
        // setIsAuth(true);
        check(formInput.name);
    }

    async function check (name) {
        const {data} = await axios.get('http://localhost:8080/api/user');
        data.forEach(element => {
            if (element.name == name) {
                setIsAuth(true);
                localStorage.setItem('id' ,element.id);
                localStorage.setItem('userName' ,element.name);
                console.log(localStorage)
            } else {
                console.log ('инах!')
            }
        });
        console.log(data);
    }

    function inputHandler (e) {
        let {name, value} = e.target;
        setFormInput({...formInput, [name]:value})
        console.log(formInput)
    }

    

    return (
        <div className="auth">
            
            <div className="auth__form form-auth">
                <div className="form-auth__title">
                    <h1>Вход</h1>
                </div>
                
                <div className="form-auth__item">
                    <label htmlFor="name" className="form-auth__label">Введите имя</label>
                    <input onChange={(e) => inputHandler(e)} value={formInput.name} name = "name" type="text" id="name" className="form-auth__input" />
                </div>
                <div className="form-auth__item">
                    <label htmlFor="email" className="form-auth__label">Введите емэйл</label>
                    <input onChange={(e) => inputHandler(e)} value={formInput.email} name = "email" type="text" id="email" className="form-auth__input" />
                </div>
                <button onClick = {() => login()} className="form-auth__button">Войти</button>
            </div>
        </div>
    )
}

export default Auth;