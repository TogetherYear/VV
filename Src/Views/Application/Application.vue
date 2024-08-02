<script lang="ts" setup>
import { provide } from 'vue';
import { Application } from './Application';
import TryVue from './Component/Try/Try.vue';

const instance = new Application();

provide('instance', instance);

const {} = instance.InitStates();

instance.InitHooks();

instance.Run();
</script>

<template>
    <div class="Application">
        <el-button type="success" @click="instance.OnBtnClick()">Application:Click Me!</el-button>
        <TryVue></TryVue>
    </div>
</template>

<style lang="scss" scoped>
@import './Application.scss';
</style>
