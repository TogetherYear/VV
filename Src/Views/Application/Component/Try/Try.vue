<script lang="ts" setup>
import { inject } from 'vue';
import { Application } from '../../Application';

const instance = inject('instance') as Application;

const { currentCount, inputName } = instance.try.InitStates();

instance.try.InitHooks();

instance.try.Run();
</script>

<template>
    <div class="Try">
        <el-button type="danger" @click="instance.try.OnBtnClick()">Try:Click Me!</el-button>
        <br />
        <el-input v-model="currentCount" type="number" style="width: 200px"></el-input>
        <br />
        <el-input v-model="inputName" style="width: 300px"></el-input>
    </div>
</template>

<style lang="scss" scoped>
@import './Try.scss';
</style>
