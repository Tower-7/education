
import {instance} from '../../utils/request';

import { websiteUrl } from '../local'

let listUrl = `${websiteUrl}/news_list`
let detailUrl = `${websiteUrl}/news_detail`

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

function news_list(o){
    return new Promise((resolve,reject)=>{
        instance.post('/news_list',o)
        .then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

function news_detail(o){
    return new Promise((resolve,reject)=>{
        instance.get(`/news_detail/${o}`)
        .then((res)=>{
            resolve(res.data[0])
        }).catch((err)=>{
            reject(err)
        })
    })
}


export default {
    news_submit,
    news_list,
    news_detail
}
