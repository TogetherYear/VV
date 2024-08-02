<script lang="ts" setup>
import { inject } from 'vue';
import { Application } from '../../Application';

const instance = inject('instance') as Application;

const {} = instance.try.InitStates();

instance.try.InitHooks();

instance.try.Run();
</script>

<template>
    <div class="Try">
        <el-button type="danger" @click="instance.try.OnBtnClick()">Try:Click Me!</el-button>
    </div>
</template>

<style lang="scss" scoped>
@import './Try.scss';
</style>
