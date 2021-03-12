<template>
  <section id="gaming-section" class="GamingSection container is-fullhd">
    <GameHeader
      :startIsDisabled="roundCounter > 0 || colorPassword.length > 0"
      :generateColorPassword="generateColorPassword"
      :roundCounter="roundCounter"
      :roundPoints="roundPoints"
    />
    <div class="GamingSection__content columns">
      <div class="column is-left">
        <main
          v-show="colorPassword && colorPassword.length > 0 && isAllowedToPlay"
          class="GameMain"
        >
          <div
            :key="selectColor"
            v-for="selectColor in colorPasswordGuess"
            class="select is-medium"
          >
            <ColorSelect
              :key="selectColor.id"
              v-model="selectColor.color"
              :colors="colors"
              @color-select="onColorSelect"
            />
          </div>

          <button
            type="submit"
            @click="checkPassword(colorPasswordGuess)"
            :disabled="isAllowedToPlay === false"
            class="button is-link is-outlined is-medium"
          >
            Finish Round
          </button>
        </main>
        <aside class="columns container">
          <div
            :key="gameRound.roundId"
            v-for="gameRound in this.filterRounds()"
            class="game-round"
            v-show="this.filterRounds().length > 0"
          >
            <GameRoundHistory :gameRound="gameRound" />
          </div>
        </aside>
      </div>
      <div class="column is-one-quarter">
        <GameLogsSidebar v-if="roundStatus.length > 0" :logs="roundStatus" />
      </div>
    </div>
  </section>
</template>

<script>
import {
  colorConstants,
  defaultSelectedColors
} from '../constants/colorConstants';
import GameHeader from './game/GameHeader';
import GameLogsSidebar from './game/GameLogsSidebar';
import ColorSelect from './ColorSelect';
import GameRoundHistory from './game/GameRoundHistory';

export default {
  name: 'GamingSection',
  components: {
    GameHeader,
    GameLogsSidebar,
    ColorSelect,
    GameRoundHistory
  },
  data() {
    return {
      colors: this.colorOptions(colorConstants),
      colorPassword: [],
      colorPasswordGuess: [
        {
          id: 0,
          color: defaultSelectedColors[0],
          isCorrect: false
        },
        {
          id: 1,
          color: defaultSelectedColors[1],
          isCorrect: false
        },
        {
          id: 2,
          color: defaultSelectedColors[2],
          isCorrect: false
        },
        {
          id: 3,
          color: defaultSelectedColors[3],
          isCorrect: false
        }
      ],
      roundCounter: 0,
      roundPoints: 0,
      gameRounds: [
        {
          roundId: 0,
          selectedColors: defaultSelectedColors
        }
      ],
      roundStatus: [],
      isAllowedToPlay: true,
      rightAnswer: false
    };
  },
  watch: {
    colorPasswordGuess() {
      const isTheCorrectGuess =
        this.colorPasswordGuess[0].isCorrect &&
        this.colorPasswordGuess[1].isCorrect &&
        this.colorPasswordGuess[2].isCorrect &&
        this.colorPasswordGuess[3].isCorrect;
      console.log(isTheCorrectGuess);
      if (isTheCorrectGuess) {
        console.log("YOU'RE A WINNER BABY!!!");
        this.isAllowedToPlay = false;
        this.rightAnswer = true;
        this.roundStatus.push({
          id: this.idGenerator,
          message: 'YOU ARE A WINNER BABY!!!'
        });
      } else {
        console.log("You ain't right yet, try again");
      }
    },
    roundCounter() {
      if (
        this.roundCounter >= 1 &&
        this.roundCounter <= 10 &&
        !this.rightAnswer
      ) {
        const auxArr = [...this.gameRounds];
        auxArr.push({
          roundId: this.roundCounter,
          selectedColors: this.colorPasswordGuess
        });
        this.gameRounds = auxArr;
      } else if (this.roundCounter > 10) {
        console.log('Game over!!!');
        this.isAllowedToPlay = false;
      }
    }
  },
  methods: {
    colorOptions(colorsArr) {
      return colorsArr.filter(color => color.colorId > 1);
    },
    idGenerator() {
      const customId =
        '_' +
        Math.random()
          .toString(36)
          .substr(2, 9);
      return customId;
    },
    setColorPassword(password) {
      this.colorPassword = password;
    },
    generateColorPassword() {
      let password = [];
      for (let i = 0; i < 4; i++) {
        const randomNum = Math.floor(Math.random() * colorConstants.length);
        const randomIndex = Math.max(2, randomNum);
        const auxColor = this.colors.find(
          color => color.colorId === randomIndex
        );
        password.push(auxColor);
      }
      console.log(password);
      this.setColorPassword(password);
    },
    onColorSelect(selectedColorId) {
      const selectedColor = this.colors.filter(
        color => color.colorId === selectedColorId
      );

      if (selectedColor !== undefined) {
        console.log('Color selection confirmed!');
      } else {
        console.log('There was an error at confirming the selected color');
      }
      return selectedColor.name;
    },
    checkPassword(passArray) {
      if (passArray && passArray.length > 0 && !this.rightAnswer) {
        passArray.map((c, idx) => {
          const isSomewhereThere = this.colorPassword.includes(c.color);
          const isRightThere =
            c.color.colorId === this.colorPassword[idx].colorId;

          if (isRightThere) {
            this.roundPoints++;
            c.isCorrect = true;
            this.roundStatus.push({
              id: this.idGenerator,
              message: `${c.color.name} is at correct position `
            });
          } else if (isSomewhereThere) {
            this.roundStatus.push({
              id: this.idGenerator,
              message: `There is one or multiple occurences of ${c.color.name} `
            });
          } else {
            this.roundStatus.push({
              id: this.idGenerator,
              message: `${c.color.name} is not there `
            });
          }
        });
      } else {
        console.log('No password provided!');
      }
      this.roundCounter++;
    },
    getRoundSelectedColorsByRoundId(roundId) {
      const auxArr = [...this.gameRounds];
      auxArr.find(arr => arr.roundId === roundId);
      if (auxArr !== undefined && roundId > 0) {
        return auxArr.selectedColors;
      } else {
        console.log('Game not started yet');
        return this.colorPasswordGuess;
      }
    },
    filterRounds() {
      const auxArr = this.gameRounds.filter(round => round.roundId > 0);
      if (auxArr.length > 0) {
        return auxArr;
      }
    }
  }
};
</script>

<style>
.GameMain {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
}

.select {
  margin: 0 15px;
}
</style>
