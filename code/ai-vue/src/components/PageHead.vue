<template>
    <div class="page-head">
        <p class="head-title">{{ props.title }}</p>
        <div class="action-btn">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>


<script setup>

const props = defineProps({
    title: {
        type: String,
        default: '页面标题'
    }
})
</script>

<style lang="scss" scoped>
.page-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .head-title {
        font-size: 24px;
        color: #2d3748;
        margin: 0;
    }
}
</style>