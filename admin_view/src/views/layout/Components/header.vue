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
            <div class="avatar">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
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
            display: inline-block;
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
    }
    
</style>