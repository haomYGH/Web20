import React from 'react';
import './App.css';
//引入UI,组件首字母应该大写，在这里测试我就不讲究了
// import Table from '@pages/table'
// import Form from '@pages/form'
import form_validateStatus from '@pages/form_validateStatus'

const App = ()=>{
  return (
    <div className="App">
      <form_validateStatus />
    </div>
  )
}

export default App;
