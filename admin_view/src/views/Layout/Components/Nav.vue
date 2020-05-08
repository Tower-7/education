<template>
    <div id="nav-wrap">
        <el-col :span="4">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :style="{'min-width': isCollapse?'64px':'200px'}"
            active-text-color="#fff"
            router>
            <el-menu-item index="1">
                <i class="el-icon-s-data"></i>
                <span slot="title">概述</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>会员管理</span>
                </template>
                <el-menu-item index="2-1">会员列表</el-menu-item>
                <el-menu-item index="2-2">教师列表</el-menu-item>
                <el-menu-item index="2-3">学生列表</el-menu-item>
            </el-submenu>
            <el-menu-item :index="'news'">
                <i class="el-icon-tickets"></i>
                <span slot="title">新闻列表</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-reading"></i>
                <span slot="title">课程列表</span>
            </el-menu-item>
           
            </el-menu>
        </el-col>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
        // isCollapse:true
        routers: ''
      };
    },
    computed: {
        ...mapState({
            isCollapse: state => state.app.isCollapse
        })
    },
    created() {
    },
    mounted() {
        console.log(this.$store.state.app.isCollapse)
        // this.routers = this.$routers.options.routes
        console.log(this.$router.options.routes)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>
    .el-menu{
        height: calc(100vh - 50px);
    }
    .el-menu-item.is-active {
        background-color: #009688 !important;
    }
    .el-menu-item:focus, .el-menu-item:hover{
        color: #fff !important;
        background-color: #009688 !important;
    }
    .el-menu-item:focus, .el-menu-item:hover .el-icon-menu{
        color: #fff !important;
    }
    .el-menu-item-group__title{
        padding: 0 !important;
    }
</style>