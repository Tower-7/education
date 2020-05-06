<template>
    <div class="detail-wrap">
        <el-col :span="20">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称" style="width:500px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>

            <div ref="editor" style="text-align:left"></div>
            <button v-on:click="getContent">查看内容</button>
        </el-col>
    </div>
</template>

<script>
    import E from 'wangeditor'
    // import Qiniu from 'qiniu'
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
           }
        }
      },
      mounted() {
        let _this = this
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        // 使用 base64 保存图片
        editor.customConfig.uploadImgShowBase64 = false
        
        // 隐藏“网络图片”tab
        editor.customConfig.showLinkImg = false

        // 允许上传到七牛云存储
        editor.customConfig.qiniu = true
        
        editor.create()
    
        // 编辑富文本
        if (this.editorContent) {
        editor.txt.html(this.editorContent)
        }
        // 初始化
        this.uploadInit(editor)
      },
     
      methods: {
          getContent: function () {
                alert(this.editorContent)
            },
           uploadInit(editor) {
            // 获取相关 DOM 节点的 ID
            var btnId = editor.imgMenuId
            var containerId = editor.toolbarElemId
            var textElemId = editor.textElemId
            // 创建上传对象
            this.$store.dispatch('upload').then(res => {
                console.log(res)
                var uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: btnId,       //上传选择的点选按钮，**必需**
                    uptoken: res.data.data,
                    unique_names: true,
                    domain: 'http://phx1pmugn.bkt.clouddn.com/', //bucket 域名，下载资源时用到，**必需**
                    container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
                    max_file_size: '100mb',           //最大文件体积限制
                    filters: {
                        mime_types: [
                        //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                        { title: "图片文件", extensions: "jpg,gif,png,bmp" }
                        ]
                    },
                    max_retries: 3, //上传失败最大重试次数
                    dragdrop: true, //开启可拖曳上传
                    drop_element: textElemId, //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb', //分块上传时，每片的体积
                    auto_start: true,  //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FileUploaded': function(up, file, info) {     
                        var domain = up.getOption('domain')
                        var res = window.$.parseJSON(info)
                        var sourceLink = domain + res.key //获取上传成功后的文件的Url
                        // 插入图片到editor
                        editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
                        }
                    }
                })
            })
            }
      }
    }
</script>

<style scoped>
</style>