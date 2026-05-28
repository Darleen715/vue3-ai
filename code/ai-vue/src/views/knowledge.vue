<template>
    <div>
        <PageHead title="知识文章">
            <template #buttons>
                <el-button type="primary" @click="dialogVisible = true">新增</el-button>
                <el-button type="primary">编辑</el-button>
            </template>
        </PageHead>
        <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
        <el-table :data="tableData" style="width: 100%; margin-top: 25px;">
            <el-table-column label="文章标题" fixed="left" width="600">
                <template #default="scope">
                    <div style="display:flex;align-items:center;">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span>{{ scope.row.title }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类" width="200">
                <template #default="scope">
                    <div style="display:flex;align-items:center;">
                        <span>{{ categoryMap[scope.row.categoryId] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="authorName" width="150" label="作者">
            </el-table-column>
            <el-table-column prop="readCount" width="150" label="阅读量">
            </el-table-column>
            <el-table-column prop="updatedAt" width="150" label="发布时间">
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
                <template #default="scope">
                    <el-button type="primary" @click="handleEdit(scope.row)" text>编辑</el-button>
                    <el-button type="success" v-if="scope.row.status === 0 || scope.row.status === 2"
                        text>发布</el-button>
                    <el-button type="warning" v-if="scope.row.status === 1" text>下线</el-button>
                    <el-button type="danger" text>删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-size="pagination.size" layout="prev, pager, next" :total="pagination.total"
            @change="handlePageChange" />
        <ArticleDialog v-model:modelValue="dialogVisible" :categories="categories" @success="handleSuccess">
        </ArticleDialog>
    </div>
</template>


<script setup>
import { onMounted, reactive, ref } from 'vue';
import PageHead from '../components/PageHead.vue';
import TableSearch from '../components/TableSearch.vue';
import { categoryTree, articlePage } from '../api/admin.js';
import ArticleDialog from '../components/ArticleDialog.vue';

const formItem = [
    {
        comp: 'input', prop: 'title', label: '文章标题', placeHolder: '请输入文章标题'
    },
    {
        comp: 'select', prop: 'categoryId', label: '分类', placeHolder: '请选择分类',
    },
    {
        comp: 'select', prop: 'status', label: '状态', placeHolder: '请选择文章内容', options: [
            { label: '草稿', value: 0 },
            { label: '已发布', value: 1 },
            { label: '已下线', value: 2 },
        ]
    }
]
// 分页参数
const pagination = reactive({
    currentPage: 1,
    size: 10,
    total: 0
})

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categories = ref([])

const tableData = ref([])

// 获取列表数据
const handleSearch = async (formData) => {
    console.log(formData, '查询参数')
    const params = {
        ...pagination,
        ...formData
    }

    const { records, total } = await articlePage(params)

    tableData.value = records;
    pagination.total = total;
}

const handlePageChange = (page) => {
    pagination.currentPage = page;
    handleSearch();
}

// 新增和编辑
const dialogVisible = ref(false)
const handleSuccess = () => { }


onMounted(async () => {
    const data = await categoryTree()
    categories.value = data.map(item => {
        categoryMap[item.id] = item.categoryName
        return {
            label: item.categoryName,
            value: item.id
        }
    })

    console.log(categories.value, '分类列表')
    formItem[1].options = categories.value

    // 获取列表
    handleSearch()
})

</script>