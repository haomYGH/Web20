/*
* @Author: TomChen
* @Date:   2019-09-04 18:13:49
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-07 09:21:13
*/

export const saveUsername = (username)=>{
    window.localStorage.setItem('username',username)
}
export const getUsername = ()=>{
    return window.localStorage.getItem('username')
}
export const removeUsername = ()=>{
    window.localStorage.removeItem('username')
}

//操作搜索关键词数据(利用storage进行存储)
export const saveHistroy = (item)=>{
    if(!item){
        return
    }
    const histroy = window.localStorage.getItem('histroy')
    if(histroy){
        const arr = histroy.split(',')
        arr.push(item)
        const s = new Set(arr)//数组去重
        window.localStorage.setItem('histroy',[...s])
    }else{
        window.localStorage.setItem('histroy',item)
    }
}

export const getHistroy = ()=>{
    const histroy = window.localStorage.getItem('histroy')
    if(histroy){
        return histroy.split(',')
    }else{
        return []
    }
}

export const removeHistroy = ()=>{
    window.localStorage.removeItem('histroy')
}