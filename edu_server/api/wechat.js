
const request = require('request-promise')
const config = require('../config/index')
const sign = require('./util')
const Token = require('../database/models/token')
const Ticket = require('../database/models/ticket')
const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential',

  ticket: {
    get: base + 'ticket/getticket?'
  }
}

const wechat = config.wechat

module.exports = {
  getSignatureAsync: async function(url) {
    const data = await fetchAccessToken()
    const ticket = await fetchTicket(data.access_token)
    const signature = await sign.index(ticket, url)
    return signature
  },
  message: async function(ctx,data){
    let token = await fetchAccessToken()
    let openids
    if(data.test==='true'){
      openids = ['oGH66jsbJJoCZfm_Ihv6BswCo5IM']
    }
    else if(data.tagid){
      let tag_url = `https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=`+token.access_token
      let tag = {   "tagid" : data.tagid,   "next_openid":"" } 
      await tag_openid(ctx,tag_url,tag)
      openids = ctx.openids
    }
    else{
      let get_openid_url= `https://api.weixin.qq.com/cgi-bin/user/get?access_token=`+token.access_token+`&next_openid=`
      openids = await requests({url: get_openid_url})
      openids = openids.data.openid
    }
    console.log(openids)
    openids.forEach(function(item){
      let url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=`+token.access_token
      let key =  {
        "touser":item,
        "template_id":"AZztmYWO19A8lpUYh68PqSq2Kf9DfqWgGkxOF1r7UtU",
        "url":data.link,
        "data":{
          "first": {
            "value":data.title,
            "color":"#173177"
        },
        "keyword1": {
            "value":data.factory,
            "color":"#173177"
        },
        "keyword2": {
            "value":data.job,
            "color":"#173177"
        },
        "keyword3": {
            "value":data.number,
            "color":"#173177"
        },
        "keyword4": {
            "value":data.phone,
            "color":"#173177"
        },
        "keyword5": {
            "value":data.order,
            "color":"#173177"
        },
        "remark": {
            "value":data.intro,
            "color":"#173177"
        },
        }
      }
      messages(ctx,url,key)
    })
    return ctx.body = {'msg':'发送成功','status':'1'}
  },
  tags:async ()=>{
    let token = await fetchAccessToken()
    let getTags = `https://api.weixin.qq.com/cgi-bin/tags/get?access_token=`+token.access_token
    let tags = await requests({url: getTags})
    return tags
  }
}

//模板消息
let messages = async(ctx,url,data)=>{
  request({
      url: url,
      method: "POST",
      json: true,
      body:data,
  }, function(error, response) {
      if (!error && response.statusCode == 200) {
        
      }
  })
}

//获取标签下的粉丝
let tag_openid = async(ctx,url,data)=>{
  await request({
    url:url,
    method:'POST',
    json:true,
    body: data,
  },async(error,response,body)=>{
    if(!error && response.statusCode == 200){
      if(body.data){
        ctx.openids = body.data.openid
      }
      else{
        ctx.openids = []
      }
    }
  }
  )
}

let fetchAccessToken = async ()=> {
  let data = await Token.getAccessToken()
   if (!isValidToken(data, 'access_token')) {
    data = await updateAccessToken()
  }

  await Token.saveAccessToken(data,Token)

  return data
}
let updateAccessToken = async  ()=> {
  const url = api.accessToken + '&appid=' + wechat.appID + '&secret=' + wechat.appSecret
  const data = await requests({url: url})

  const now = (new Date().getTime())
  const expiresIn = now + (data.expires_in - 20) * 1000

  data.expires_in = expiresIn

  return data
}

requests = async  (options)=> {
  options = Object.assign({}, options, {json: true})

  try {
    const response = await request(options)
    return response
  } catch (error) {
    console.error(error)
  }
}
let fetchTicket = async  (token)=> {
  let data = await Ticket.getTicket()

  if (!isValidToken(data, 'ticket')) {
    data = await updateTicket(token)
  }

  await Ticket.saveTicket(data,Ticket)

  return data
}

let updateTicket = async  (token)=> {
  const url = api.ticket.get + '&access_token=' + token + '&type=jsapi'

  let data = await requests({url: url})
  const now = (new Date().getTime())
  const expiresIn = now + (data.expires_in - 20) * 1000

  data.expires_in = expiresIn

  return data
}

let isValidToken = (data, name)=> {
  if (!data || !data[name] || !data.expires_in) {
    return false
  }

  const expiresIn = data.expires_in
  const now = (new Date().getTime())

  if (now < expiresIn) {
    return true
  } else {
    return false
  }
}
