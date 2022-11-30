<script lang="ts" setup>
import PreloadVue from './preload/Preload.vue';
import DebugVue from './debug/Debug.vue';
import { zhCN, dateZhCN } from 'naive-ui'
import { themeOverrides } from './naive/index'
import { App } from './App'
import { Debug } from './debug/Debug'

const {
  isDebug
} = Debug.Instance.InitStates()

App.Instance.Run()
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <DebugVue v-if="isDebug"></DebugVue>
        <PreloadVue></PreloadVue>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
@import "./App.scss";
</style>
