export default {
    total(state){
		return state.todos.length
    },
    totalDone(state){
		return state.todos.reduce((total,item)=>{
			if(item.done){
				total++
			}
			return total
		},0)
		
	},
	allDone(state,getter){
		return (getter.total == getter.totalDone) && (getter.total != 0)
	}	
}