/*
* @Author: TomChen
* @Date:   2019-08-16 10:17:38
* @Last Modified by:   Chen
* @Last Modified time: 2020-09-04 17:04:27
*/
//目标 导出一个对象 对象的属性是方法名,对象的值是方法

import axios from 'axios'


import {API_CONFIG,SERVER,VERSION } from './config.js'
import { removeUsername } from 'util'

const getApiObj = (apiConfig)=>{
    const apiObj = {}

    for(let key in apiConfig){
        apiObj[key] = (data,v)=>{
            let version = VERSION
            if(v){
                version = v
            }            
            //处理请求参数
            let url = apiConfig[key][0] || ''
            // url = '/' + version + url 
            /*
            if(!url.startsWith('http://') && SERVER){
               url = SERVER + url 
               console.log(url)
            } 
            */

            let method = apiConfig[key][1] || 'get'
            return request(url,method,data)
        }
    }

    return apiObj
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        const options = {
            method: method,
            url:url,
            withCredentials:true,
        }
        switch(options.method.toUpperCase()){
            case 'GET':
            case 'DELETE':
                options.params = data
                break
            default:
                options.data = data
        }
        axios(options)
        .then(result=>{
            const data  = result.data
            if(data.code == 10){
                removeUsername()
                window.location.href = '#/login'
                reject('用户没有权限')
            }else{
                resolve(data)
            }
            
        })
        .catch(err=>{
            reject(err)
        })
    })
}


export default getApiObj(API_CONFIG)
