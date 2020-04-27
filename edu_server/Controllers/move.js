const Common = require('./common')
const Essay = require('../Models/essay')
const Teacher = require('../Models/teacher')
const User = require('../Models/user.js')
module.exports = {
    // 测试
    test:async(ctx)=>{
      ctx.body = {'msg':'恭喜你，测试成功','status':'200'}
    },
	
	// 编辑碎片
	essay_edit: async (ctx)=>{
	    let id = ctx.query.id
	    let essay = [{
	        _id: '',
	        text: '',
	        pic: '',
	    }]
	    if(id){
	        essay = await Essay.findById(Essay,id)
	    }
	    return 
		ctx.body = {
			status: 200,
			data: essay
		}
	},
	// 上传碎片
	essay_submit: async(ctx)=>{
	    await Common.update(ctx,Essay)
	},
	essay_list: async(ctx)=>{
		let data = ctx.request.body
		let start = data.start
		let num = data.num
		let essayList = await Essay.getList(Essay,start,num)
		return ctx.body = {status: 200,data: essayList}
	},
    
	// 编辑老师资料
	teacher_edit: async (ctx)=>{
	    let id = ctx.query.id
	    let teacher = [{
	        _id: '',
	        avatar: '',
	        nickname: '',
	        phone: '',
	        addr: '',
	        lat:'',
			lon:'',
	        signature: '',
	        experienceTime: '',
	        job: '',
	        school: '',
	        profession: '',
	        course: '',
	        photo: '',
	        experience: '',
	        intro: '',
	    }]
	    if(id){
	        teacher = await Teacher.findById(Teacher,id)
	    }
	    return 
		ctx.body = {
			status: 200,
			data: teacher
		}
	},
	// 上传老师资料
	teacher_submit: async(ctx)=>{
	    await Common.update(ctx,Teacher)
	},
	// 老师资料列表
	teacher_list: async(ctx)=>{
		let data = ctx.request.body
		let start = data.start
		let num = data.num
		let teacherList = await Teacher.getList(Teacher,start,num)
		return ctx.body = {status: 200,data: teacherList}
	},
	// 老师详情
	teacher_detail: async(ctx)=>{
		let id = ctx.params.id
		let teacher = await Teacher.findById(Teacher,id)
		return ctx.body = {status: 200,data: teacher}
	},
	// 用户登陆注册
	login: async(ctx)=>{
		let data = ctx.request.body
		let _data = data
		let openid = _data.openid
		let user = await User.findByOpenid(User,openid)
		if(user.length == 0){
			_data = new User(_data)
			await _data.save()
			return ctx.body = {'msg':'发布成功',data: _data}
		}
		else{
			return ctx.body = {status: 200,data: user}
		}
	},
	// 用户提交
	user_submit: async(ctx)=>{
		let openid = ctx.request.body.openid
		let user = await User.findByOpenid(User,openid)
		if(user.length != 0){
			ctx.request.body.id = user[0]._doc._id
		}
		await Common.update(ctx,User)
	},
	// 获取用户信息
	get_userInfo: async(ctx)=>{
		let openid = ctx.params.openid
		let user = await User.findByOpenid(User,openid)
		return ctx.body = {status: 200,data: user}
	},
	// 用户列表
	user_list: async(ctx)=>{
		let data = ctx.request.body
		let start = data.start
		let num = data.num
		let userList = await User.getList(User,start,num)
		console.log(userList)
		return ctx.body = {status: 200,data: userList}
	},
	// 老师详情
	user_detail: async(ctx)=>{
		let id = ctx.params.id
		let user = await User.findById(User,id)
		return ctx.body = {status: 200,data: user}
	},
	//验证登陆中间件
    signRequired: async(ctx,next) => {
        let user = ctx.session.user
        let url = ctx.request.originalUrl
        if(!user){
            return ctx.redirect('/m/sign?' + url)
        }
        await next()
    }
}
