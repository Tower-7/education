import * as localConfig from '../local/config'
let webUrl
// #ifdef H5
webUrl = `/api`
// #endif
// #ifndef H5
webUrl = localConfig.websiteUrl
// #endif


let list_url = `${webUrl}/m/essay_list`
	
function getList(o){
	return new Promise((resolve,reject)=>{
		uni.request({
		    url: list_url,
			method: 'POST',
		    data: o,
		    success: (res) => {
				resolve(res)
		    },
			fail(err) {
				console.log(err)
			}
			
		});
	})
}

export default {
	getList
}