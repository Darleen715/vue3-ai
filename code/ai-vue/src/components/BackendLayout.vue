<template>
    <div class="backend-layout">
        <el-container class="main-container">
            <Sidebar />
            <el-container>
                <el-header>
                    <Navbar />
                </el-header>
                <el-main class="main-content">
                    <RouterView class="content-container"></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
</script>


<style scoped lang="scss">
.backend-layout {
    height: 100vh;

    .el-header {
        height: 72px !important;
    }

    .main-container {
        height: 100%;

        .content-container {
            padding: 20px;
            background-color: #fff;
            min-height: calc(100% - 72px);
        }
    }
}
</style>