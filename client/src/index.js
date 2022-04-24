import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../src/components/bootstrap/bootstrap.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store from "./components/Redux/store";
import {Provider} from "react-redux";

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
