const Common = require('./common')
const Admin = require('../Models/admin')
module.exports = {
    //主页
    index: async ctx => {
        await ctx.render('index',{

        })
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
                  ctx.session.user = user
                  ctx.body = {'msg':'登录成功','status':'0'}
              }
              else {
                  ctx.body = {'msg':'密码错误','status':'2'}
              }
          }
      )
      return promise
    }

}
