<template>
    <el-dialog title="文章详情" v-model="dialogVisible" width="50%" @close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择分类">
                    <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要（可选）" maxlength="1000"
                    show-word-limit clearable :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
                <el-select v-model="formData.tagArray" placeholder="请输入文章标签（逗号分隔）" multiple filterable allow-create
                    style="width:100%;">
                    <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面图片">
                <div class="cover-upload">
                    <el-upload class="avatar-uploader" action="#" :before-upload="beforeUpload"
                        :http-request="handleUploadRequest" accept="image/*" :show-file-list="false">
                        <div v-if="!imgUrl" class="cover-placeholder">
                            <p>点击上传封面</p>
                        </div>
                        <img v-else :src="imgUrl" class="cover-image" alt="封面图片">
                    </el-upload>
                    <div v-if="imgUrl" class="cover-remove">
                        <el-button type="danger" size="mini" @click="handleRemove">移除封面</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <RichTextEditor v-model="formData.content" placeholder="请输入文章内容...支持富文本格式,可以使用加粗、斜体、,列表、标题等格式来丰富文章内容。"
                    :max-char-count="5000" @change="handleContentChange" @created='handleEditorCreated'
                    min-height="400px">
                </RichTextEditor>
            </el-form-item>
        </el-form>
        <div v-if="btnPreview">
            <h3>内容预览</h3>
            <div v-html="formData.content"></div>
        </div>
        <template #footer>
            <el-button type="primary" @click="btnPreview = !btnPreview">{{ btnPreview ? '隐藏预览' : '预览效果' }}</el-button>
            <el-button type="primary" @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit()" :loading="loading">创建文章</el-button>

        </template>

    </el-dialog>
</template>


<script setup>
import { ref, computed, reactive, nextTick } from 'vue'
import { uploadFile, createArticle } from '@/api/admin'
import { fileBaseUrl } from '../config'
import RichTextEditor from './RichTextEditor.vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array,
        default: () => []
    }
})
const handleClose = () => {

}

const emit = defineEmits(['update:modelValue', 'success'])
const dialogVisible = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
})



// 表单数据
const formData = reactive(
    {
        "title": "",
        "content": "",
        "coverImage": "",
        "categoryId": 1,
        "summary": "",
        "tags": "",
        "id": ""
    }
)

const rules = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { max: 200, message: '文章标题不能超过200个字符', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' },
        { max: 5000, message: '文章内容不能超过5000个字符', trigger: 'blur' }
    ]
})

const commonTags = [
    '情绪管理', '焦虑', '抑郁', '压力', '睡眠',
    '冥想', '正念', '放松', '心理健康', '自我成长',
    '人际关系', '工作压力', '学习方法', '生活技巧'
]

// 上传图片
const imgUrl = ref('')
const beforeUpload = (file) => {
    // 针对上传前的文件进行校验
    console.log('beforeUpload', file)
    const isImage = file.type.startsWith('image/')
    const isLt5MB = file.size / 1024 / 1024 < 5
    if (!isImage) {
        console.error('上传文件必须是图片格式')
        return false
    }

    if (!isLt5MB) {
        console.error('上传文件不能超过5MB')
        return false
    }

    return true
}
const handleUploadRequest = async ({ file }) => {
    // UUID生成
    const businessId = crypto.randomUUID() // 业务ID
    const fileRes = await uploadFile(file, {
        businessId: businessId,
    })
    console.log(fileRes)
    // 拼接完整的图片地址
    imgUrl.value = `${fileBaseUrl}${fileRes.filePath}`
    formData.coverImage = fileRes.filePath
}

const handleRemove = () => {
    imgUrl.value = ''
    formData.coverImage = ''
}

// 富文本
const handleContentChange = (data) => {
    formData.content = data.html

}
const editorInstance = ref(null)
const handleEditorCreated = (editor) => {
    if (formData.content && editor) {
        nextTick(() => {
            editor.setHtml(formData.content)
        })
    }
}

const btnPreview = ref(false)

// 提交
const formRef = ref()
const loading = ref(false)
const handleSubmit = () => {
    formRef.value.validate((valid, fields) => {
        if (valid) {
            loading.value = true
        }

        console.log(formData, 'formData')

        const submitData = {
            ...formData,
            tags: formData.tagArray.join(',')
        }

        delete submitData.tagArray


        createArticle(submitData).then(res => {
            loading.value = false
            emit('success')
        })
    })
}




</script>



<style lang="scss" scoped>
.cover-placeholder {
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #8b949e;
    background: #f6f8fa
}

.cover-image {
    width: 200px;
    height: 120px;
    display: block;
}
</style>