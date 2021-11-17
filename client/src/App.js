import './App.css';
import './blog.scss';
import {BrowserRouter} from "react-router-dom";
import Header from './components/Header';
import Pages from './components/Pages';

import {useState, useEffect} from 'react';

import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';


import {AuthContext} from './context'

function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setIsAuth(true);
    }
  }, [])

  

  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state.posts);


  return (
    <div className="app">
         <AuthContext.Provider 
            value = {{
                      isAuth,
                      setIsAuth: setIsAuth
             }}>
                 <BrowserRouter>
                     <Header/>
                     <Pages/>
                 </BrowserRouter>   
      </AuthContext.Provider>  
     
    </div>
  );
}

export default App;
