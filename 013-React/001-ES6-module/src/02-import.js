//多次引用模块只执行一次
// import './01-export.js';
// import './01-export.js';

//写法一
// import { a } from './01-export';//.js可以省略。
// console.log('a=',a);
//写法二
//引入方法同写法一
//写法三
// import {b as b1} from './01-export'
//写法四
//写法五：前几个写法的合并
import ee,{a,b} from './01-export'
console.log(ee,a,b)