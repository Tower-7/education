const Common = require('./common')
const Admin = require('../Models/admin')
const News = require('../Models/news')
const jwt = require('jsonwebtoken');
module.exports = {
    //主页
    index: async ctx => {
        return ctx.body = {'msg':'测试成功'}
    },
    // 注册
    sign_up: async ctx => {
      let user = ctx.request.body
      let dbUser = await Admin.findByName(Admin,user.username)
      if(dbUser != null) {
      return ctx.body = {'msg':'用户名已存在','status':'1'}
      }
      let _user = new Admin({
          username: user.username,
          password: user.password
      })
      user = await _user.save()
      return ctx.body = {'msg':'注册成功','status':'0'}
    },
    // 登录
    sign_in: async ctx => {
      let user = ctx.request.body
      let dbUser = await Admin.findByName(Admin,user.username)
      if(dbUser === null) {
          return ctx.body = {'msg':'用户不存在','status':'1'}
      }
      let promise = new Promise((res,rej) => {
          dbUser.comparePassword(user.password,(err,isMatch) => {
              if(err){
                  rej(err)
              }
              res(isMatch)
          })
      })
      promise.then(
          isMatch => {
              if(isMatch) {
                  let token = jwt.sign(user, 'secret', {
                    expiresIn: 60*60*1
                  });
                  ctx.body = {'msg':'登录成功','status':'0','token': token}
              }
              else {
                  ctx.body = {'msg':'密码错误','status':'2'}
              }
          }
      )
      return promise
    },
    //验证登陆中间件
    signRequired: async(ctx,next) => {
        let token = ctx.request.header.authorization
        console.log(token)
        jwt.verify(token, 'secret', function (err) {
            if (err) {
                return ctx.body = {'msg':'登录过期，请重新登录!','status':'4'}
            }else{
                next()
            }
        })
    },
    news_edit: async(ctx)=>{
        await Common.update(ctx,News)
    },
    news_submit: async(ctx)=>{
        await Common.update(ctx,News)
    },
    news_list: async(ctx)=>{
        let data = ctx.request.body
		let start = data.start
		let num = data.num
		let newsList = await News.getList(News,start,num)
		return ctx.body = {status: 200,data: newsList}
    },
    news_detail: async(ctx)=>{
        let id = ctx.params.id
		let news = await News.findById(News,id)
		return ctx.body = {status: 200,data: news}
    },
    newsListByType: async(ctx)=>{
        let data = ctx.request.body
        let start = data.start
        let num = data.num
        let type = data.type
		let newsList = await News.getListByType(News,start,num,type)
		return ctx.body = {status: 200,data: newsList}
    }

}
