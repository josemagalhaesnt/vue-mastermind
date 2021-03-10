<template>
  <section id="gaming-section" class="container is-fullhd">
    <GameHeader
      :startIsDisabled="roundCounter >= 2"
      :generateColorPassword="generateColorPassword"
      :roundCounter="roundCounter"
      :roundPoints="roundPoints"
    />
    <div class="columns">
      <div class="column">
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
      </div>
      <div class="column">
        <GameLogsSidebar v-if="roundStatus.length > 0" :logs="roundStatus" />
      </div>
      <GameRoundHistory
        v-show="roundCounter > 1"
        :roundCounter="roundCounter"
        :passwordGuess="colorPasswordGuess"
      />
    </div>
  </section>
</template>

<script>
import colorConstants from "../constants/colorConstants";
import GameHeader from "./game/GameHeader";
import GameLogsSidebar from "./game/GameLogsSidebar";
import ColorSelect from "./ColorSelect";
import GameRoundHistory from "./game/GameRoundHistory";

export default {
  name: "GamingSection",
  components: {
    GameHeader,
    GameLogsSidebar,
    ColorSelect,
    GameRoundHistory
  },
  data() {
    return {
      colors: colorConstants,
      colorPassword: [],
      colorPasswordGuess: [
        {
          id: 0,
          color: "grey",
          isCorrect: false
        },
        {
          id: 1,
          color: "grey",
          isCorrect: false
        },
        {
          id: 2,
          color: "grey",
          isCorrect: false
        },
        {
          id: 3,
          color: "grey",
          isCorrect: false
        }
      ],
      roundCounter: 0,
      roundPoints: 0,
      roundStatus: [],
      isAllowedToPlay: true,
      rightAnswer: false
    };
  },
  watch: {
    colorPasswordGuess() {
      console.log(this.colorPasswordGuess);
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
          message: "YOU ARE A WINNER BABY!!!"
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
        console.log(`Round is over`);
      } else if (this.roundCounter > 10) {
        console.log("Game over!!!");
        this.isAllowedToPlay = false;
      }
    }
  },
  methods: {
    idGenerator() {
      const customId =
        "_" +
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
        const randomIndex = Math.floor(Math.random() * 3);
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
        console.log("Color selection confirmed!");
      } else {
        console.log("There was an error at confirming the selected color");
      }
      return selectedColor.name;
    },
    checkPassword(passArray) {
      if (passArray && passArray.length > 0 && !this.rightAnswer) {
        passArray.map((c, idx) => {
          const isSomewhereThere = this.colorPassword.includes(c.color);
          const isRightThere =
            c.color.colorId === this.colorPassword[idx].colorId;
          console.log("IS AT CORRECT POSITION ?" + isRightThere);

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
        console.log("No password provided!");
      }
      this.roundCounter++;
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
