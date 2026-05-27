<template>
    <div class="navbar flex-box">
        <div class="flex-box">
            <el-button @click="handleCollapse">
                <el-icon>
                    <Expand />
                </el-icon>
            </el-button>
            <p class="page-title">导航栏</p>
        </div>
        <div class="flex-box">
            <el-dropdown @command="handleCommand">
                <div class="flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span class="username">admin</span>
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>


<script setup>
import { useAdminStore } from "@/stores/admin"

const handleCommand = (command) => {
    console.log(command);

    if (command === 'logout') {
        // 退出登录
    }
}


const handleCollapse = () => {
    console.log('handleCollapse');
    useAdminStore().toggleCollapse()
}

</script>


<style lang="scss" scoped>
.flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.navbar {
    height: 100%;
    padding: 0 15px;
    justify-content: space-between;
    background-color: #fff;

    .page-title {
        margin-left: 20px;
        font-size: 25px;
        font-weight: 600;
    }
}
</style>