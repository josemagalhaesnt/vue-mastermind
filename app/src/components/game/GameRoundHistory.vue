<template>
  <section class="GameRoundHistory">
    <div class="card">
      <div class="card-content">
        <p>Round {{ gameRound.roundId }}</p>

        <ol class="selected-colors">
          <li>
            <ColorIcon
              :colorHex="getColorHex(this.gameRound.selectedColors[0])"
              :size="50"
            ></ColorIcon>
          </li>
          <li>
            <ColorIcon
              :colorHex="getColorHex(this.gameRound.selectedColors[1])"
              :size="50"
            ></ColorIcon>
          </li>
          <li>
            <ColorIcon
              :colorHex="getColorHex(this.gameRound.selectedColors[2])"
              :size="50"
            ></ColorIcon>
          </li>
          <li>
            <ColorIcon
              :colorHex="getColorHex(this.gameRound.selectedColors[3])"
              :size="50"
            ></ColorIcon>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
import ColorIcon from '../ColorIcon';

export default {
  name: 'GameRoundHistory',
  components: {
    ColorIcon
  },
  props: {
    gameRound: {
      type: Object,
      required: true
    }
  },
  methods: {
    getColorHex(colorParam) {
      if (colorParam !== undefined) {
        const { hexValue } = colorParam.color;
        return hexValue;
      }
    }
  }
};
</script>

<style>
.GameRoundHistory {
  width: 100%;
  padding: 20px;
  margin: 40px;
}
.selected-colors {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.selected-colors li {
  list-style: none;
}
</style>
