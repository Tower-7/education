import {instanceAdmin} from '../../utils/request';

import { getToken } from "@/utils/userStorage";

function test(data){
        console.log(getToken())
        return new Promise((resolve,reject)=>{
        instanceAdmin.post('/index',data)
        .then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export default  {
    test,
}