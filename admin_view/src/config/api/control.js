import {instanceAdmin} from '../../utils/request';

function test(data){
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