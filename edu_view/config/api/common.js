import * as localConfig from '../local/config'
let webUrl
let qiniuUrl
// #ifdef H5
webUrl = `/api`
qiniuUrl = `/api`
// #endif
// #ifndef H5
webUrl = localConfig.websiteUrl
qiniuUrl = localConfig.qiniuUrl
// #endif

let getToken_url = `${webUrl}/qiniu/config`

function getToken(){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: getToken_url,
			type: 'GET',
			success:(res)=> {
				resolve(res)
			}
		})
	})
}

function upload(o,token){
	return new Promise((resolve,reject)=>{
		wx.uploadFile({
		   url: 'https://up.qiniup.com',
		   name: 'file',
		   filePath: o,
		   header: {
		     "Content-Type": "multipart/form-data"
		   },
		  formData: {
		    token: token,
		  },
		  success: function(res) {
				let data = JSON.parse(res.data)
				let url = `${qiniuUrl}/${data.key}`
				resolve(url)
		  },
		  fail: function(res) {
				reject(res)
		  }
		});
	})
}

export default {
	getToken,
	upload
}