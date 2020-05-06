
import {instance} from '../../utils/request';

function getToken(){
    return new Promise((resolve,reject)=>{
        instance.get('/qiniu/config')
        .then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
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
    upload,
}
