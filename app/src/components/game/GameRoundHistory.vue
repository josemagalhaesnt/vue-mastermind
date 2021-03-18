<template>
  <section class="GameRoundHistory container">
    <div :key="gameRound.roundId" v-for="gameRound in gameRounds" class="card">
      <div class="card-content columns">
        <div class="column">
          <ol class="selected-colors">
            <li>
              <p>Round {{ gameRound.roundId }}</p>
            </li>
            <li>
              <ColorIcon
                :colorHex="getColorHex(gameRound.selectedColors[0])"
              ></ColorIcon>
            </li>
            <li>
              <ColorIcon
                :colorHex="getColorHex(gameRound.selectedColors[1])"
              ></ColorIcon>
            </li>
            <li>
              <ColorIcon
                :colorHex="getColorHex(gameRound.selectedColors[2])"
              ></ColorIcon>
            </li>
            <li>
              <ColorIcon
                :colorHex="getColorHex(gameRound.selectedColors[3])"
              ></ColorIcon>
            </li>
          </ol>
        </div>
        <div class="column">
          <ul class="round-result">
            <li>
              <ColorIcon
                :colorHex="getStatusColor(gameRound.status[0])"
              ></ColorIcon>
            </li>
            <li>
              <ColorIcon
                :colorHex="getStatusColor(gameRound.status[1])"
              ></ColorIcon>
            </li>
            <li>
              <ColorIcon
                :colorHex="getStatusColor(gameRound.status[2])"
              ></ColorIcon>
            </li>
            <li>
              <ColorIcon
                :colorHex="getStatusColor(gameRound.status[3])"
              ></ColorIcon>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { colorConstants } from '../../constants/colorConstants';
import ColorIcon from '../ColorIcon';

export default {
  name: 'GameRoundHistory',
  components: {
    ColorIcon
  },
  computed: {
    isValidResult(statusColor) {
      return statusColor !== 'transparent';
    }
  },
  inject: ['gameRounds'],
  methods: {
    getColorHex(colorParam) {
      if (colorParam !== undefined) {
        const { hexValue } = colorParam;
        return hexValue;
      } else {
        return 'grey';
      }
    },
    getStatusColor(gameRoundStatus) {
      let statusColor = 'transparent';
      const statusColorObj = colorConstants.find(
        color => color.name === gameRoundStatus.value
      );
      if (statusColorObj !== undefined) {
        statusColor = statusColorObj.hexValue;
      }
      return statusColor;
    }
  }
};
</script>

<style>
.GameRoundHistory {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-height: 75%;
  box-sizing: border-box;
  padding: 20px 0;
  margin-top: 40px;
}
.card {
  width: min(500px, 30vw);
  margin: 0 20px;
}
.selected-colors,
.round-result {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.selected-colors li,
.round-result li {
  list-style: none;
}
</style>
