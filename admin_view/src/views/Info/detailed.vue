<template>
    <div class="detail-wrap">
        <div class="submit" @click="submit()">发布</div>
        <el-col :span="20" class="wrap">
            <el-row>
                <el-col :span="6" class="space">1</el-col>
                <el-col :span="12" class="content">
            
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="标题" style="width:500px">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="form" label-width="80px" >
                        <el-form-item label="封面" style="width:500px">
                            <el-upload
                            class="avatar-uploader"
                            :action="uploadQiniuUrl"
                            :data="qiniuData"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="简介" style="width:500px">
                            <el-input v-model="form.intro"></el-input>
                        </el-form-item>
                    </el-form>
                    
                    <div ref="editor"></div>
                </el-col>
                <el-col :span="6" class="space">1</el-col>
            </el-row>
        </el-col>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import { qiniuUrl } from '../../config/local'
    // import Qiniu from 'qiniu'
    export default {
      name: 'editor',
      data () {
        return {
            editorContent: '',
            form: {
                title: '',
                intro: ''
            },
            imageUrl: '',
            uploadQiniuUrl:"https://upload.qiniup.com",
            qiniuData:{
                token : "",
                key : "",
            },
        }
      },
      mounted() {
        let _this = this
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'undo',  // 撤销
            'redo'  // 重复
        ]
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
     created(){
         this.getToken()
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
                    var uploader = Qiniu.uploader({
                        runtimes: 'html5,flash,html4',    //上传模式,依次退化
                        browse_button: btnId,       //上传选择的点选按钮，**必需**
                        uptoken: res.uploadToken,
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
                            let res = JSON.parse(info.response)
                            var sourceLink = `${qiniuUrl}/${res.key}` //获取上传成功后的文件的Url
                            // 插入图片到editor
                            editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:400px;"/>')
                            }
                        }
                    })
                })
            },
            getToken(){
                let _this = this
                _this.$store.dispatch('upload').then(res=>{
                    _this.qiniuData.token = res.uploadToken
                    _this.qiniuData.key = res.key
                })
            },
            handleAvatarSuccess(res, file) {

                this.imageUrl = `${qiniuUrl}/${res.key}`;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submit(){
                let data = {
                    title: this.form.title,
                    cover: this.imageUrl,
                    intro: this.form.intro,
                    content: this.editorContent
                }
                this.$store.dispatch('news_submit',data).then(res=>{
                    console.log(res)
                })
            }
      }
    }
</script>
<style lang="scss" scoped>
    .submit {
        position: fixed;
        top: 100px;
        right: 140px;
        color: #fff;
        background-color: #409EFF;
        padding: 10px 50px;
        cursor: pointer;
        z-index: 10001;
    }
    .space{
        color: transparent;
    }
    .wrap{
        height: calc(100vh - 50px);
        padding-top: 50px;
        overflow-y: scroll;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .content{
        min-width: 700px;
        padding: 50px;
        background-color: #fff;
        
    }
    .avatar-uploader .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 220px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 220px;
        height: 120px;
        display: block;
    }
    
</style>