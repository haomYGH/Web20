import axios from 'axios';


export const getHomeAds = ()=>{
	return axios({
		url:"ads/positionAds"
	})
	.then(result=>{
		if(result.data.code == 0){
			return result.data.data
		}else{
			throw 'no data'
		}
	})
	.catch(err=>{
		console.log(err)
	})
}