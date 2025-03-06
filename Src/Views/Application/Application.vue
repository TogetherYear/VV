<script lang="ts" setup>
import { provide } from 'vue';
import { Application } from './Application';
import SubPage from './Components/SubPage/SubPage.vue';

const instance = new Application();

provide('instance', instance);

const {} = instance.InitStates();

instance.Run();
</script>

<template>
    <div class="Application">
        <SubPage></SubPage>
    </div>
</template>

<style lang="scss" scoped>
@import './Application.scss';
</style>
