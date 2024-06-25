<script lang="ts" setup>
import { provide } from 'vue';
import { Application } from './Application';

const instance = new Application()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Application">
        <n-button type="primary" class="Btn" @click="instance.Test(5, 'b')">Emit</n-button>
    </div>
</template>

<style lang="scss" scoped>
@import "./Application.scss";
</style>
