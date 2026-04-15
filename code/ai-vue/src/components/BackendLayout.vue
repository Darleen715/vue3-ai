<template>
    <div class="backend-layout">
        <el-container>
            <Sidebar />
            <el-container>
                <el-header>
                    <Navbar />
                </el-header>
                <el-main>
                    <RouterView></RouterView>
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
}
</style>