import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const defaultState = {
      posts: [],
    }
 

  const blogReducer = (state = defaultState, action) => {
      switch (action.type) {
        case "GET_POSTS":
          //заменем стор полностю
          return {...state, posts : [...action.payload ]};
        case "ADD_POST":
          //доавлем в стор оъект
          return {...state, posts: [...state.posts, action.payload]};
        case "DELETE_POST":
          return {...state, posts: action.payload };
        // case "UPDATE_POST":
        //   return { posts : [...action.payload]};
        case "UPDATE_POST":
          let objCopy = Object.assign({}, state);
          for (let index = 0; index < objCopy.posts.length; index++) {
            const element = objCopy.posts[index];
            if (element.id === action.payload.id) {
              element.title = action.payload.title;
              element.content = action.payload.content;
              element.theme = action.payload.theme;
              element.img = action.payload.img;
            }
          }
          
          return {...state, posts:[...objCopy.posts]};
        default:
          return state;  
      }
  }


  const defaultUserState = {
    user: ''
  }


const userReducer = (state = defaultUserState, action) => {
    switch (action.type) {
      case "GET_USER":
        //заменем стор полностю
        return {...state, user : action.payload };
        default:
          return state;  
      }
  }

  //оъединем редюсеры КОМАЙНРЕДЮССЕРОМ импортированным из redux
const rootReducer = combineReducers({
      posts: blogReducer,
      users: userReducer
});

  const store = createStore(rootReducer);

console.log(process.env.REACT_APP_API_URL);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);


