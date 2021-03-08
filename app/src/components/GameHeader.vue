<template>
  <header class="GameHeader">
    <nav class="game-controls columns">
      <div class="game-controls-bar column">
        <button
          @click="generateColorPassword"
          :disabled="startIsDisabled"
          class="button is-primary"
        >
          Start Game
        </button>
      </div>
      <div class="column" v-bind="roundCounter">Round: {{ roundCounter }}</div>
      <div class="column" v-bind="roundPoints">Points: {{ roundPoints }}</div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "GameHeader",
  props: {
    startIsDisabled: {
      type: Boolean,
      default: false
    },
    generateColorPassword: {
      type: Function,
      required: true
    },
    roundCounter: {
      type: Number,
      required: true
    },
    roundPoints: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.game-controls {
  background-color: whitesmoke;
  color: #222;
  padding: 10px 0;
}
</style>
