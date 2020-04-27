var mongoose = require('mongoose')

var DbSchema = new mongoose.Schema({
	openid: String,
	gender: String,
	city: String,
	province: String,
	country: String,
	avatarUrl: String,
	nickName: String,
	phone: Number,
	role: Number,
	addr: String,
	lat: String,
	lon: String,
	signature: String,
	experienceTime: String,
	job: String,
	school: String,
	profession: String,
	course: String,
	photo: Array,
	experience: String,
	intro: String,
	meta: {
		createAt: {
			type:Date,
			default:Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
DbSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
DbSchema.statics = {
	findByAll: (db)=>{
		return db
		.find({})
		.sort({'meta.updateAt':-1})
	},
	findByActive: (db)=>{
		return db
		.find({active:true})
		.sort({'meta.updateAt':-1})
	},
	getList: (db,start,num)=>{
		return db
		.find()
		.sort({'meta.updateAt':-1})
		.skip(start).limit(num);
	},
	findById: (db,id)=>{
		return db
		.find({_id:id})
	},
	findByOpenid: (db,openid)=>{
		return db
		.find({openid:openid})
	},
	updateById:(db,id,data)=>{
		let nowdata = Date().toString()
		return db
		.update({_id: id},data,{upsert:true})
		.update({_id: id},{'meta.updateAt': nowdata})
	},
	delById:(db,id)=>{
		return db
		.remove({_id:id})
	}
}
module.exports = DbSchema