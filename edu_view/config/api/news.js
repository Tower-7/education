import * as localConfig from '../local/config'
let webUrl
// #ifdef H5
webUrl = `/api`
// #endif
// #ifndef H5
webUrl = localConfig.websiteUrl
// #endif

let list_url = `${webUrl}/news_list`
let detail_url = `${webUrl}/news_detail`



function getNewsList(o){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: list_url,
			method: 'POST',
			data: o,
			success:(res)=> {
				resolve(res.data)
			}
		})
	})
}


function getNewsById(o){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: `${detail_url}/${o}`,
			method: 'GET',
			success(res) {
				resolve(res.data.data[0])
			}
		})
	})
}



export default {
	getNewsList,
	getNewsById
}