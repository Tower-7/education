const multer = require('koa-multer');
//文件上传
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置，单个文件
const upload = multer({ storage: storage }).single('file');

module.exports = {
    //注册
    sign_up: async ctx => {
        let user = ctx.request.body
        let url = ctx.request.headers.referer
        let reg =  /([^?]+)$/
        url = url.replace(reg, "")
        let dbUser = await User.findByName(User,user.name)
        if(dbUser != null) {
        return ctx.body = {'msg':'用户名已存在','status':'2','url':url}
        }
        let _user = new User({
            name: user.name,
            password: user.password
        })
        user = await _user.save()
        return ctx.body = {'msg':'注册成功','status':'1','url':url}
    },
    //登录
    sign_in: async ctx => {
        let user = ctx.request.body
        let url = ctx.request.headers.referer
        let reg =  /([^?]+)$/
        url = url.match(reg)[1];
        let dbUser = await User.findByName(User,user.name)
        if(dbUser === null) {
            return ctx.body = {'msg':'用户不存在','status':'2'}
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
                    ctx.body = {'msg':'登录成功','status':'1','url':url}
                }
                else {
                    ctx.body = {'msg':'密码错误','status':'3'}
                }
            }
        )
        return promise
    },
    //登出
    logout: async ctx => {
        delete ctx.session.user
        ctx.redirect('/')
    },
	
	// 编辑
	update:async(ctx,db)=> {
	    let data = ctx.request.body
	    let _data = data
	    if(data.id){
	        _data = {$set: _data}
	        await db.updateById(db,data.id,_data)
	        return ctx.body = {'msg':'更新成功','status':'200'}
	    }
	    else {
	        _data = new db(_data)
	        await _data.save()
	        return ctx.body = {'msg':'发布成功','status':'200'}
	    }
	},
    
    //上传
    upload: async ctx => {
            await upload(ctx,function (err) {
            let imgPath = ctx.req.file.filename
            imgPath = 'https://edu.ishuber.com/uploads/'+imgPath
            return ctx.body = imgPath
        })
    }
}