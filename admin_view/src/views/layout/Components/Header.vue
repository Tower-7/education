<template>
  <div id="header-wrap">
    <el-row>
        <el-col :span="12">
            <div class="menu">
                <span class="icon iconfont">&#xe625;</span>
            </div>
            <div class="logo">
                <span class="icon iconfont">&#xe63c;</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="info">
                <div class="username pull-left">username</div>
                <div class="avatar pull-left">
                    <img src="@/assets/images/logo.png" alt="">
                </div>
                <div class="logout pull-left">
                    <span class="icon iconfont">&#xe64b;</span>
                </div>
            </div>
            
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    name: 'layoutHeader',
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        size: "medium"
      }
    },
    methods: {
        
       
    }
}
</script>
<style lang="scss" scoped>
    .el-row {
        height: 50px;
        line-height: 50px;
        background-color: #24292e;
        color:#fff;
        .menu {
            float: left;
            width: 50px;
            height: 50px;
            background-color: #8e8c8c;
            text-align: center;
            cursor: pointer;
            span{
                font-size: 20px;
            }
        }
        .logo {
            display: inline-block;
            height: 50px;
            margin-left: 10px;
            cursor: pointer;
            span {
                font-size: 30px;
            }
            
        }
        .info{
            float: right;
            .pull-left{
                float: left;
                margin: 0 10px;
            }
            .username{
                cursor: default;
            }
            .avatar img {
                width: 30px;
                margin-top: 10px;
                border-radius: 5px;
                cursor: pointer;
            }
            .logout {
                width: 50px;
                height: 50px;
                background-color: #8e8c8c;
                margin-left: 40px;
                margin-right: 0;
                text-align: center;
                cursor: pointer;
                span {
                    font-size: 20px;
                }
            }
        }
    }
    
</style>
