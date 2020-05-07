
import {instance} from '../../utils/request';

function news_submit(o){
    return new Promise((resolve,reject)=>{
        instance.post('/admin/news_submit',o)
        .then((res)=>{
            console.log(res)
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
   
}



export default {
    news_submit,
}
