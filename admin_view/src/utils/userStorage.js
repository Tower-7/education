let storage = window.localStorage;

const adminToken = 'admin_token'

export function setToken(token){
    return storage.setItem(adminToken,token)
}

export function getToken(){
    return storage.getItem(adminToken)
}


