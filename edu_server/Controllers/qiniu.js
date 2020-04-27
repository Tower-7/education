const qiniu = require("qiniu")
const configs = require("../config")
const sha1 = require('sha1')
module.exports = {
	getConfig: async ctx=>{
		let mac = new qiniu.auth.digest.Mac(configs.qiniu.AK, configs.qiniu.SK);
		let options = {scope: 'tt-edu'};
		let putPolicy = new qiniu.rs.PutPolicy(options);
		let uploadToken = putPolicy.uploadToken(mac);
		let key = sha1(Math.random().toString(36).substr(2));
		
		return ctx.body={
			key,
			uploadToken
		}
	},
    upload: async ctx =>{
		console.log(ctx.req)
  //       let mac = new qiniu.auth.digest.Mac(configs.qiniu.AK, configs.qiniu.SK);
  //       let options = {scope: 'tt-edu'};
  //       let putPolicy = new qiniu.rs.PutPolicy(options);
  //       let uploadToken = putPolicy.uploadToken(mac);
		// let localFile = ctx.request.body.data[0]
  //       let config = new qiniu.conf.Config();
  //       config.zone = qiniu.zone.Zone_z0;
		// let key = '112.jpg'
  //       let formUploader = new qiniu.form_up.FormUploader(config);
  //       let putExtra = new qiniu.form_up.PutExtra();
  //       // 文件上传
  //       formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,respBody, respInfo) {
  //           if (respErr) {
  //               throw respErr;
  //           }
  //           if (respInfo.statusCode == 200) {
  //               console.log(respBody);
  //           } else {
  //               console.log(respInfo.statusCode);
  //               console.log(respBody);
  //           }
  //       });
    }
}

