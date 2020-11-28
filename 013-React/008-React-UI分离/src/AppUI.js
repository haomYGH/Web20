import React from 'react'
//引入antd-UI
import { Input,Button,List } from 'antd';

export const AppUI = (props)=>{
    return (
        <div className="App">
        <Input 
             value = {props.task}
             onChange = {props.handleChange.bind(this)}
        />
         <Button
             type="primary"
             onClick = {props.handleAdd.bind(this)}
         >
             提交
         </Button>
         <List
             style={{marginTop:10}}
             bordered
             dataSource={props.list}
             renderItem={(item,index) => (
                 <List.Item
                     task={item}
                     onClick = { props.handleDel.bind(this,index) }
                 >
                     {item}
                 </List.Item>
             )}
         />
     </div>        
    )
}