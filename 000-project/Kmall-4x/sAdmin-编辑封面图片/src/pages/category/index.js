import React from 'react'//代码解析

import { 
	Route, 
	Switch
} from "react-router-dom"

import CategoryList from './list';
import CategoryAdd from './add';

class Demo extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/category/add" component={CategoryAdd} />
                <Route path="/category" component={CategoryList} />
            </Switch>
        )
    }
}
export default Demo