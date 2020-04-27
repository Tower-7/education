const Router = require('koa-router')
const Common = require('./Controllers/common')
const Move = require('./Controllers/move')
const Admin = require('./Controllers/admin')
const Wechat = require('./Controllers/wechat/index')
const Qiniu = require('./Controllers/qiniu')
const router = new Router()

module.exports = (app) => {

	//网页授权
	router.get('/wechat/getOpenId/:code',Wechat.getOpenId)
	router.post('/wechat/getOpenId',Wechat.getEduCode)
	router.get('/wechat/getEduInfo',Wechat.getEduInfo)

    router.get('/m/test',Move.test)

	// 碎片
	router.post('/m/essay_edit',Move.essay_edit) //编辑碎片
	router.post('/m/essay_submit',Move.essay_submit) //提交碎片
	router.post('/m/essay_list',Move.essay_list) //碎片列表

	//老师个人资料
	router.post('/m/teacher_edit',Move.teacher_edit) //编辑资料
	router.post('/m/teacher_submit',Move.teacher_submit) //提交资料
	router.post('/m/teacher_list',Move.teacher_list) //资料列表
	router.get('/m/teacher_detail/:id',Move.teacher_detail) //资料列表

	//用户个人资料

	router.post('/m/login',Move.login) //用户登陆
	router.post('/m/user_submit',Move.user_submit) //提交资料
	router.get('/m/userInfo/:openid',Move.get_userInfo) //用户资料
	router.post('/m/user_list/',Move.user_list) //用户列表
	router.get('/m/user_detail/:id',Move.user_detail) //用户详情

	// 后台管理
	router.get('/admin/',Admin.index) //管理员注册
	router.post('/admin/sign_up',Admin.sign_up) //管理员注册
	router.post('/admin/sign_in',Admin.sign_in) //管理员注册

	router.post('/upload',Common.upload)//上传

	router.post('/qiniu',Qiniu.upload)
	router.get('/qiniu/config',Qiniu.getConfig)

    app.use(router.routes()).use(router.allowedMethods())
}
