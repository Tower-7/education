<template>
    <div id="index">
        test
    </div>
</template>
<script>
export default {
    name: 'index',
    data(){
      
        
        return {
         
        }
    },
    created(){
        this.test()
    },
    methods: {
        test(){
            let data = {
                test: 'test'
            }
            this.$store.dispatch('test',data).then(res=>{
                console.log(res)
            })
        }
       
    }

}
</script>
<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #344a5f;
    }
    .login-wrap {
        width: 330px;
        margin: auto;
        padding-top: 150px;
    }
    .menu-tab {
        display: flex;
        text-align: center;
        li {
            flex: 1;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            line-height: 36px;
        }
        .current {
            background-color: rgba($color: #000000, $alpha: 0.1)
        }
    }
    .login-form{
        margin-top: 30px;
        label{
            display: block;
            color: #fff;
            margin-bottom: 4px;
        }
        .block {
            display:block;
            width: 100%;
        }
    }

</style>

