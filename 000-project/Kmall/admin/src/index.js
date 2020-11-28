/*
* @Author: Chen
* @Date:   2020-07-24 15:09:24
* @Last Modified by:   Chen
* @Last Modified time: 2020-07-28 17:39:28
*/
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './App.js'
import store from './store/index.js';

ReactDom.render(
	<Provider store={store}>
    	<App />
  	</Provider>,
	document.getElementById('root')
)
