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
    </nav>
  </header>
</template>

<script>
export default {
  name: 'GameHeader',
  inject: ['onStartBtnClick', 'roundCounter'],
  props: {
    startIsDisabled: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>
.GameHeader {
  height: 25%;
}
.game-controls {
  display: flex;
  justify-content: center;
  background-color: teal;
  border-radius: 5px;
  color: white;
  padding: 10px 0;
}

.game-controls-bar > .button {
  margin: 0 10px;
}
</style>
