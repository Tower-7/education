const sha1 = require('sha1')

module.exports = {
    index: async function (ticket, url){
        const nonce = createNonce()
        const timestamp = createTimestamp()
        const signature = signIt(nonce, ticket, timestamp, url)

        return {
            noncestr: nonce,
            timestamp: timestamp,
            signature: signature
        }
    }
  }

function createNonce () {
  return Math.random().toString(36).substr(2, 15)
}

function createTimestamp () {
  return parseInt(new Date().getTime() / 1000, 0) + ''
}

function raw (args) {
  let keys = Object.keys(args)
  let newArgs = {}
  let str = ''

  keys = keys.sort()
  keys.forEach((key) => {
    newArgs[key.toLowerCase()] = args[key]
  })

  for (let k in newArgs) {
    str += '&' + k + '=' + newArgs[k]
  }

  return str.substr(1)
}

function signIt (nonce, ticket, timestamp, url) {
  const ret = {
    jsapi_ticket: ticket.ticket,
    nonceStr: nonce,
    timestamp: timestamp,
    url: url
  }

  const string = raw(ret)
  const sha = sha1(string)

  return sha
}
