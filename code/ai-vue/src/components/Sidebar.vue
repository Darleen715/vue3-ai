<template>
    <el-aside :width="isCollapse ? '64px' : '264px'">
        <el-menu default-active="2" class="menu-style" :collapse="isCollapse" :collapse-transition="false">
            <div class="brand">
                <el-image :src="iconUrl" alt="logo"></el-image>
                <div v-show="!isCollapse" class="info-card">
                    <h1 class="brand-title">心理健康AI助手</h1>
                    <p class="brand-subtitle">管理后台</p>
                </div>
            </div>

            <el-menu-item v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path"
                @click="selectMenu">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>

</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useAdminStore } from "@/stores/admin"
const router = useRouter();


const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href;


const isCollapse = computed(() => useAdminStore().isCollapse)
const selectMenu = (key) => {
    const currentRoute = router.options.routes[0]
    const url = `${currentRoute.path}/${key.index}`
    router.push(url)
}


</script>

<style lang="scss" scoped>
.menu-style {
    height: 100%;

    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        gap: 10px;
        background-color: #fff;
        border-bottom: 1px solid #e5e7eb;

        .el-image {
            width: 50px;
            aspect-ratio: 1;
        }

        .info-card {
            .brand-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .brand-subtitle {
                font-size: 12px;
                color: #6b7280;
            }
        }
    }
}
</style>