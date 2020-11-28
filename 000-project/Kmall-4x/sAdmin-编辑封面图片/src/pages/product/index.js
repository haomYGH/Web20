import React,{ Component } from 'react'
import { Route,Switch } from "react-router-dom"

import ProductSave from './save_edit.js'
// import ProductDetail from './detail.js'
import ProductList from './list.js'


class Product extends Component{
    render(){
        return(
           <Switch>
               {/* <Route path="/product/save" component={ProductSave} /> */}
               <Route path="/product/save_edit/:productId?" component={ProductSave} />
               <Route path="/product" component={ProductList} />
           </Switch>
        )
    }
}

export default Product