<template>
  <header class="GameHeader">
    <nav class="game-controls columns">
      <div class="game-controls-bar column">
        <button
          @click="onStartBtnClick()"
          :disabled="startIsDisabled"
          class="button is-primary"
        >
          Start Game
        </button>
      </div>
      <div class="column">Round: {{ roundCounter }}</div>
      <div class="column">Points: {{ roundPoints }}</div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'GameHeader',
  inject: ['onStartBtnClick', 'roundCounter', 'roundPoints'],
  props: {
    startIsDisabled: {
      type: Boolean,
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

.game-controls-bar > .button {
  margin: 0 10px;
}
</style>
