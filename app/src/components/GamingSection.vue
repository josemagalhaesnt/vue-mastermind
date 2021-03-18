<template>
  <div class="GamingSection container is-fullhd">
    <GameHeader :startIsDisabled="hasGameStarted" />

    <main v-show="hasGameStarted && isAllowedToPlay" class="GameMain">
      <div class="control has-icons-left">
        <div
          :key="selectedColor"
          v-for="selectedColor in colorPasswordGuess"
          class="select is-medium"
        >
          <ColorSelect
            :key="selectedColor.id"
            v-model="selectedColor.color"
            @color-select="onColorSelect"
          />
          <div class="icon is-small is-left">
            <ColorIcon :colorHex="selectedColor.color.hexValue" />
          </div>
        </div>
        <button
          type="submit"
          @click="checkPassword"
          :disabled="!isAllowedToPlay"
          class="button is-primary is-medium"
        >
          Finish Round
        </button>
      </div>
    </main>
    <section class="GamingSection__content">
      <div class="container">
        <aside class="GameRounds" v-if="gameRounds.length">
          <GameRoundHistory />
        </aside>
      </div>
    </section>
  </div>
</template>

<script>
import {
  colorConstants,
  defaultSelectedColors
} from '../constants/colorConstants';
// import { gameDefault } from '../constants/gameConstants';
import GameHeader from './game/GameHeader';
import ColorIcon from './ColorIcon';
import ColorSelect from './ColorSelect';
import GameRoundHistory from './game/GameRoundHistory';

export default {
  name: 'GamingSection',
  components: {
    GameHeader,
    ColorSelect,
    ColorIcon,
    GameRoundHistory
  },
  computed: {
    colorOptions() {
      return colorConstants.filter(color => color.colorId > 1);
    },
    hasGameStarted() {
      return !!(this.roundCounter > 0 || this.colorPassword.length);
    },
    isCorrectPasswordGuess() {
      const passArr = this.colorPasswordGuess;
      const isCorrect =
        this.colorPassword.length &&
        this.colorPassword.every((color, idx) => {
          return color.colorId === passArr[idx].color.colorId;
        });

      if (isCorrect) {
        console.log("You guessed it right, YOU'RE A WINNER BABY");
      }
      return isCorrect;
    }
  },
  data() {
    return {
      colorPassword: [],
      colorPasswordGuess: [
        {
          id: 0,
          color: defaultSelectedColors[0].color
        },
        {
          id: 1,
          color: defaultSelectedColors[1].color
        },
        {
          id: 2,
          color: defaultSelectedColors[2].color
        },
        {
          id: 3,
          color: defaultSelectedColors[3].color
        }
      ],
      roundCounter: 0,
      gameRounds: [],
      isAllowedToPlay: true,
      rightAnswer: false
    };
  },
  provide() {
    return {
      onStartBtnClick: this.generateColorPassword,
      // onResetBtnClick: this.resetGame,
      startIsDisabled: this.hasGameStarted,
      roundCounter: this.roundCounter,
      gameRounds: this.gameRounds,
      colors: this.colorOptions
    };
  },
  watch: {
    roundCounter(counter) {
      if (counter > 10 && !this.rightAnswer) {
        console.log('Game over!!!');
        this.isAllowedToPlay = false;
      }
    }
  },
  methods: {
    idGenerator() {
      const customId =
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9);
      return customId;
    },
    generateColorPassword() {
      if (!this.colorPassword.length) {
        let password = [];
        for (let i = 0; i < 4; i++) {
          const randomNum = Math.floor(Math.random() * colorConstants.length);
          const randomIndex = Math.max(2, randomNum);
          const auxColor = this.colorOptions.find(
            color => color.colorId === randomIndex
          );
          password.push(auxColor);
        }
        console.log(password);

        this.colorPassword = password;
      } else {
        console.log('Password already exists!');
      }
    },
    onColorSelect(selectedColorId) {
      const selectedColor = this.colorOptions.filter(
        color => color.colorId === selectedColorId
      );

      if (selectedColor !== undefined) {
        console.log('Color selection confirmed!');
      } else {
        console.log('There was an error at confirming the selected color');
      }
      return selectedColor.name;
    },
    getStatus() {
      const passArray = this.colorPasswordGuess.map(({ color }) => color);
      const status = [];

      passArray.forEach((c, idx) => {
        const isSomewhereThere = this.colorPassword.includes(c);
        const isRightThere = c.colorId === this.colorPassword[idx].colorId;

        if (isRightThere) {
          status.push({ index: idx, value: 'black' });
        } else if (isSomewhereThere) {
          status.push({ index: idx, value: 'white' });
        } else {
          status.push({ index: idx, value: '' });
        }
      });

      return status;
    },
    checkPassword() {
      const selectedColors = this.colorPasswordGuess.map(({ color }) => color);
      this.roundCounter++;
      this.gameRounds.push({
        roundId: this.roundCounter,
        selectedColors,
        status: this.getStatus()
      });

      if (this.isCorrectPasswordGuess) {
        this.rightAnswer = true;
        this.isAllowedToPlay = false;
        return true;
      }
      return false;
    }
    /* resetGame() {
      return this({
        colorPassword: gameDefault.colorPassword,
        colorPasswordGuess: gameDefault.colorPasswordGuess,
        roundCounter: gameDefault.roundCounter,
        gameRounds: gameDefault.gameRounds,
        isAllowedToPlay: gameDefault.isAllowedToPlay,
        rightAnswer: gameDefault.rightAnswer
      });
    } */
  }
};
</script>

<style>
.GamingSection {
  margin: 20px 0;
  height: 80%;
}

.GameMain {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.select {
  margin-right: 25px;
}
</style>
