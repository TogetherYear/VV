<script lang="ts" setup>
import { Debug } from './Debug'
const {
    canvas,
} = Debug.Instance.InitStates()
Debug.Instance.InitHooks()
Debug.Instance.Run()
</script>

<template>
    <div class="Debug">
        <canvas class="Canvas" ref="canvas"></canvas>
    </div>
</template>

<style lang="scss" scoped>
@import "./Debug.scss";
</style>