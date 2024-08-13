<script lang="ts" setup>
import { TTest } from '@/Decorators/TTest';
import { Test } from './Test';

const {} = Test.InitStates();
const { testMap } = TTest;
Test.InitHooks();
Test.Run();
</script>

<template>
    <div class="Test">
        <span class="Item" v-for="t in testMap" :key="t[0]" @click="Test.OnClickTest(t[1])">{{ t[1].label }}</span>
    </div>
</template>

<style lang="scss" scoped>
@import './Test.scss';
</style>
