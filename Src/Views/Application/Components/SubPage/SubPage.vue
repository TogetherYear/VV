<script lang="ts" setup>
import { inject } from 'vue';
import { Application } from '../../Application';

const instance = inject('instance') as Application;

const {} = instance.subPage.InitStates();

instance.subPage.Run();
</script>

<template>
    <div class="SubPage"></div>
</template>

<style lang="scss" scoped>
@import './SubPage.scss';
</style>
