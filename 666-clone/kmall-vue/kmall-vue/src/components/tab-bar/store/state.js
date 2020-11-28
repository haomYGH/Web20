/*
* @Author: TomChen
* @Date:   2019-09-03 19:19:48
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-01 19:23:44
*/
//唯一数据源,属于当前模型
export default {
    active:Number(sessionStorage.getItem('tabBarActiveIndex')) || 0,
}