import React from 'react'
import ReactDOM from 'react-dom'
//使用React-Redux管理数据
import { Provider } from 'react-redux'
import store from './store'
//引入前端路由
import { BrowserRouter, Route } from "react-router-dom";

import App from './App.js'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);