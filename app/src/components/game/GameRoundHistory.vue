<template>
  <div :key="gameRound" class="card" v-for="gameRound in gameRounds">
    <div
      :key="password"
      v-bind="passwordGuess"
      v-for="password in passwordGuess"
      class="GameRound card-content"
    >
      <div class="content">
        <p v-bind="roundCounter">Round {{ roundCounter }}</p>
        <span :key="password" class="icon has-text-info">
          <i
            class="fas fa-info-circle"
            style="color: password.color.hexColor; fontSize: 16"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameRoundHistory",
  props: {
    passwordGuess: {
      type: Array,
      default: undefined
    },
    roundCounter: {
      type: Number,
      required: true
    }
  },
  watch: {
    passwordGuess() {
      if (this.passwordGuess.length > 1) {
        this.gameRounds.push(() => this.passwordGuess);
      }
    }
  },
  data() {
    return {
      gameRounds: []
    };
  }
};
</script>

<style></style>
