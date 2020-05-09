<template>
    <div class="new-list">
        <el-col :span="20">
            <el-row :gutter="14">
            <el-col :span="2">&nbsp;</el-col>
                <el-col :span="5">
                    <div class="label-wrap category">
                        <label for="">分类：</label>
                        <div class="warp-content">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="label-wrap key-work">
                        <label for="">关键字：&nbsp;&nbsp;</label>
                        <div class="warp-content">
                            <SelectVue :config="data.configOption" :selectData.sync="selectData"/>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="danger" style="width: 100%;" @click="search()">搜索</el-button>
                </el-col>
                <el-col :span="3">&nbsp;</el-col>
                <el-col :span="3">
                    <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialog_info = true" >新增</el-button>
                </el-col>
            </el-row>
        </el-col>
        
        <!-- 表格数据 -->
        <el-col :span="20" class="table">
            <div class="black-space-30"></div>
            <template>
                <el-table
                    :data="tableData "
                    border>
                    <el-table-column width="150" label="发布时间">
                        <template slot-scope="scope">{{ scope.row.meta.updateAt| formatDate}}</template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题" width="150"> </el-table-column>
                    <el-table-column prop="cover" label="封面" width="180"> 
                        <template slot-scope="scope"><img :src="scope.row.cover" width="160" /></template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-col>
    </div>
</template>
<script>

// 组件
import SelectVue from "@/components/Select";
import TableVue from "@/components/Table";
export default {
    name: 'infoIndex',
    components: { SelectVue,TableVue },
   data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        data: {
            configOption: {
                init: ["id", "title"]
            }
        },
        selectData: {},
        search_keyWork: '',
        tableData: []
      }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(){
            let data = {
                start: 0,
                num: 20
            }
            let _this = this
            this.$store.dispatch('news_list',data).then(res=>{
                _this.tableData = res.data
                console.log(res.data)
            })
        }
    },
    filters: {
        formatDate: (value)=> {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return `${y}-${MM}-${d}`;
			},
			maxLenghtFilter:function(value){
				if(value){
					return value.substring(0,20) + '...'
				}
			},
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.el-table{
    width:99.9%!important;
    height: calc(100vh - 50px) !important;
}
.new-list>div{
    padding: 20px;
}
.label-wrap {
    &.category { @include labelDom(left, 60, 40); }
    &.date { @include labelDom(right, 93, 40); }
    &.key-work { @include labelDom(right, 99, 40); }
}
</style>
