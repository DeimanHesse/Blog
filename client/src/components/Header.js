import { NavLink, Link} from "react-router-dom";
import {useContext, useState} from "react";
import { AuthContext } from "../context";

function Header () {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    function logout () {
        setIsAuth(false);
        localStorage.removeItem('userName');
    }

    const [burgerBtn, setBurgerBtn] = useState( 'burger__btn');
    const [nav, setNav] = useState( 'burger__nav');

    function active () {
        if (nav == 'burger__nav') {
            let nav2 = nav + ' active';
            let burgerBtn2 = burgerBtn + ' active';
            console.log(nav2);
            setNav(nav2);
            setBurgerBtn(burgerBtn2)
        } else {
           let nav2 = 'burger__nav';
           let burgerBtn2 = 'burger__btn';
           setBurgerBtn(burgerBtn2);
           console.log(nav2);
           setNav(nav2);
        }
    }

    return (
        <div className="app__header header">
            <div className="header__logo logo">
            <NavLink className="logo__item" to="/">Blog</NavLink>
                </div>
            <div className="header__nav nav">
                <NavLink className="nav__item" to="/">Главная</NavLink>
                <NavLink className="nav__item" to="/about">О нас</NavLink>
                <NavLink className="nav__item" to="/contacts">Контакты</NavLink>
            </div>
            
            
            
            <div className="header__enter">
                <div className="header__auth">
                    {

                        isAuth ?

                        <NavLink onClick={logout} className="header__link" to="/">Выйти</NavLink>
                        :
                        <div className="header__logout">
                            <NavLink className="header__link" to="/auth">Войти</NavLink>
                            <NavLink className="header__link" to="/reg">Зарегистрироваться</NavLink>
                        </div>
                        

                    }
                   
                   
                </div>
            </div>
            <div className="header__burger burger">
                <div className={burgerBtn} onClick={active} >
                    <span></span>
                    <span></span>
                    <span></span>
                
                </div>
                <div className={nav} onClick={active}>
                    <NavLink className="burger__item" to="/">Главная</NavLink>
                    <NavLink className="burger__item" to="/about">О нас</NavLink>
                    <NavLink className="burger__item" to="/contacts">Контакты</NavLink>
                    
                
                    {
                        isAuth ?

                        <NavLink onClick={logout} className="burger__link" to="/">Выйти</NavLink>
                        :
                        <div className="burger__logout">
                            <NavLink className="burger__link" to="/auth">Войти</NavLink>
                            <NavLink className="burger__link" to="/reg">Зарегистрироваться</NavLink>
                        </div>
                        

                    }
                </div>

               
            </div>        
    </div>
    )
}

export default Header;