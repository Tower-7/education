const https = require("https")
const request = require('request')
const wechat = require('../../api/wechat')
const User = require('../../Models/user')

module.exports = {
  signature: async ctx => {
    let url = ctx.query.url
    if (!url) ctx.throw(404)
    url = decodeURIComponent(url)
    const params = await wechat.getSignatureAsync(url)
    ctx.body = {
      success: true,
      data: params
    }
  },
  getOpenId: async (ctx)=>{
		let code = ctx.params.code
		let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxbb47121088a4a253&secret=0afd081e695ff08857f56dc8b25472e6&js_code=`+ code +`&grant_type=authorization_code`
		let data
		await new Promise((resolve,reject)=>{
			request(url,(err,response,body)=>{
				if(!err){
					resolve(body)
				}
			})
		}).then((res)=>{
			data = res
		})
		return ctx.body = {status: 200,data: data}
	  
	  
  },
  getEduCode: async (ctx,next)=> {
    let user = ctx.session.user
    let uri = ctx.request.url
    if(!user){
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf53d31d58e5d2451&redirect_uri=https://edu.ishuber.com/wechat/getEduInfo&response_type=code&scope=snsapi_userinfo&state=`+uri+`#wechat_redirect`
      ctx.response.redirect(url)
    }
    else{
      uri = uri.match(/.*(?=\?\S+)/)
      if(uri){
        ctx.response.redirect(uri[0])
      }
      await next()
    }
  },
  getEduInfo: async (ctx)=> {
    let src = ctx.request.url;
    //提取code
    let code = src.match(/(?<=code=).*(?=&state)/)
    
    //获取openid
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf53d31d58e5d2451&secret=d9624c3b44e5b933a9e14e9f04b766a9&code=`+ code +`&grant_type=authorization_code`
    let data =  await requests({url: url})
    url =`https://api.weixin.qq.com/sns/userinfo?access_token=`+data.access_token+`&openid=`+data.openid+`&lang=zh_CN`
    let user =  await requests({url: url})
    let info = await User.findByOpenid(User,data.openid)
    if(info!=''){
		console.log(111)
		await User.updateById(User,info._id)
	}
    else{
		console.log(222)
      if(user.sex==1){
        user.sex = '男'
      }
      else{
        user.sex = '女'
      }
	  console.log(user)
      _user = new User(user)
      await _user.save()
    }
    info = await User.findByOpenid(User,data.openid)
    ctx.session.user = info
    
  },
}