var mongoose = require('mongoose')
var bcrypt_nodejs = require('bcrypt-nodejs')
var SALT_WORK_FACTOR = 10

var AdminSchema = new mongoose.Schema({
    username: {
        unique: true,
		type: String,
    },
	password: String,
    role: Number,//0:user,5:admin,10:superAdmin,
	meta: {
		createAt: {
			type: Date,
			default: Date.now(),
		},
		updateAt: {
			type: Date,
			default: Date.now(),
		},
	}
})

AdminSchema.pre('save',function(next) {
	var user = this
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	bcrypt_nodejs.genSalt(SALT_WORK_FACTOR,function(err,salt) {
		if(err) return next(err)
		bcrypt_nodejs.hash(user.password,salt,null,function(err,hash) {
			if(err) return next(err)
				user.password = hash
			next()
		})
	})
})
AdminSchema.methods = {
	comparePassword: function(_password,cb) {
		bcrypt_nodejs.compare(_password,this.password,function(err,isMatch) {
			if(err) return cb(err)
				cb(null,isMatch)
		})
	}
}
AdminSchema.statics = {
	fetch: function(cb) {
		return this
		.find({})
		.sort({'meta.updateAt':-1})
		.exec(cb)
	},
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.updateAt':-1})
		.exec(cb)
	},
	findByPhone: async(db,data)=>{
		return db
		.findOne({phone: data})
	},
	findById: async(db,id)=>{
		return db
		.findOne({_id: id})
		.exec()
	},
	updateById: async (db,id,_db)=> {
		return db
		.update({_id: id},_db,{upsert:true})
	},
	findByName: async(Admin,username)=> {
		return Admin
		.findOne({username: username})
	},
	deleteById: function(id,cb) {
		return this
		.remove({_id:id})
		.exec(cb)
	}
}


module.exports = AdminSchema
