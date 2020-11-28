/*
    page:请求页码
    model:数据模型
    query:查询条件
    projection:投影
    sort:排序
*/
/*
	分页:
	约定:每一页显示 2 条 limit(2) limit = 2
	
	第 1 页 跳过 0 条 skip(0)
	第 2 页 跳过 2 条 skip(2)
	第 3 页 跳过 4 条 skip(4)

	第 page 页 跳过 （page -1）* limit 条 skip(（page -1）* limit)

*/
    
async function pagination(options){
	let { page,model,query,projection,sort,populates } = options;
    let limit = 2;
	if(isNaN(page)){
		page = 1;
	}
	//上一页边界控制
	if(page <= 0){
		page = 1
    }
    //获取数据库中有多少条数据，(用来计算总共显示几页)
	let count = await model.countDocuments(query);//countDocuments是mongoose上的方法，用来获取总数
	//计算总页数
    let pages = Math.ceil(count / limit)
	//下一页边界控制
    if(page > pages){
		page = pages
    }
    //生成页码数组(用于前台循环遍历,i=1表示第一页)
	let list = [];
	for(let i = 1;i<=pages;i++){
		list.push(i)
    }
	//跳过条数
	let skip = (page -1) * limit;
	//skip不能为负数
	if(skip < 0){
		skip = 0;
	}
	let result = model.find(query,projection);//find不是异步操作吗，为啥不加await

	//如果需要关联查询填入
	if(populates){
		//数组方法将其展开
		populates.forEach(function(populate){
			result = result.populate(populate);
		})
	}
    //最后从数据库排序抽取对应页显示信息
	// const docs = await model.find(query,projection).sort(sort).skip(skip).limit(limit);
	const docs = await result.sort(sort).skip(skip).limit(limit);
    //Promise异步程序返回值(可在then(data)中拿到)
    return {
		docs,
		page,
		list,
		pages	
	}
}
module.exports=pagination