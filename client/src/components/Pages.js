import {Switch,Route, Redirect} from "react-router-dom";
import { useContext } from "react";
import Main from "../pages/Main";
import Auth from "../pages/Auth2";
import Reg from "../pages/Reg";
import About from "../pages/About";
import Contacts from "../pages/Contacts";

import { AuthContext } from "../context";
import PostOpen from "./PostOpen";


function BlogPages () {
    //контекст дл передачи авторизации...а можно ли то хранит в редаксе
    const {isAuth, setIsAuth} = useContext(AuthContext)
    // const isAuth = false;

    return (

        
        <div className="app__pages pages">
            {isAuth 
            ?
                <Switch>
                    <Route exact path= "/" component={Main}/>
                    <Route exact path= "/about" component={About}/>
                    <Route exact path= "/post/:id" component={PostOpen}/>  
                    <Route exact path= "/contacts" component={Contacts}/>
                    <Redirect to= "/"/>    
                </Switch>

            :

                <Switch>
                    <Route exact path= "/" component={Main}/>
                    <Route exact path= "/auth" component={Auth}/>   
                    <Route exact path= "/post/:id" component={PostOpen}/>   
                    <Route exact path= "/reg" component={Reg}/>
                    <Route exact path= "/about" component={About}/>
                    <Route exact path= "/contacts" component={Contacts}/>
                    {/* <Redirect to= "/auth"/>     */}
                </Switch>
          
        }
         </div>
    )
} 

export default BlogPages;