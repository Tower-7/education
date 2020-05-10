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
            <div v-for="(item,index) in routers" :key="index">
                <div v-if="!item.hidden">
                    <el-menu-item :index="item.path" v-if="item.children.length == 1">
                        <i class="el-icon-s-data"></i>
                        <span slot="title">{{item.meta.name}}</span>
                    </el-menu-item>
                    <el-submenu index="index" v-if="item.children.length != 1">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>{{item.meta.name}}</span>
                        </template>
                        <el-menu-item 
                        v-for="(subItem,index2) in item.children"
                        :index="subItem.path"
                        :key="index2">{{subItem.meta.name}}</el-menu-item>
                    </el-submenu>
                </div>
            </div>
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
        this.routers = this.$router.options.routes
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