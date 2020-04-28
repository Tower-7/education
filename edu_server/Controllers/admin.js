const Common = require('./common')
const Admin = require('../Models/admin')
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
        jwt.verify(token, 'secret', function (err) {
            if (err) {
                return ctx.body = {'msg':'登录过期，请重新登录!','status':'4'}
            }else{
                next()
            }
        })
    },

}
