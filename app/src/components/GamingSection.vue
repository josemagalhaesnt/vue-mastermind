<template>
  <section id="gaming-section">
    <header class="game-controls">
      <div class="game-controls-bar">
        <button
          @click="generateColorPassword"
          :disabled="colorPassword.length > 0"
          class="button--confirm"
        >
          Start Game
        </button>
        <div class="game-control--round" v-bind="roundCounter">
          Round: {{ roundCounter }}
        </div>
        <div class="game-control--points" v-bind="roundPoints">
          Points: {{ roundPoints }}
        </div>
      </div>
    </header>
    <div v-if="colorPassword.length > 0" class="game-input-area">
      <ColorSelect :colors="colors" @color-select="onColorSelect" />
      <ColorSelect :colors="colors" @color-select="onColorSelect" />
      <ColorSelect :colors="colors" @color-select="onColorSelect" />
      <ColorSelect :colors="colors" @color-select="onColorSelect" />
      <button
        type="submit"
        @click="checkPassword(colorPasswordGuess)"
        :disabled="rightAnswer"
      >
        Finish Round
      </button>
    </div>
    <!-- <div v-show="roundStatus.length > 0">
      <p v-for="status in roundStatus" v-bind="roundStatus">{{ status }}</p>
    </div> -->
  </section>
</template>

<script>
import colorConstants from "../constants/colorConstants";
import ColorSelect from "./ColorSelect";

export default {
  name: "GamingSection",
  components: {
    ColorSelect
  },
  data() {
    return {
      colors: colorConstants,
      colorPassword: [],
      colorPasswordGuess: [],
      rightAnswer: false,
      roundCounter: 0,
      roundPoints: 0,
      roundStatus: ""
    };
  },
  computed: {},
  watch: {
    roundCounter() {
      if (1 < this.roundCounter <= 10 && !this.rightAnswer) {
        console.log(`Round ${this.roundCounter}`);
        console.log("You ain't right yet, try again");
      } else if (this.roundCounter > 10) {
        console.log("Game over!!!");
      }
    },
    colorPasswordGuess() {
      console.log(this.colorPasswordGuess);
      if (this.colorPasswordGuess === this.colorPassword) {
        this.rightAnswer = true;
      }
    }
  },
  methods: {
    setColorPassword(password) {
      this.colorPassword = password;
    },
    onColorSelect(selectedColorId) {
      const selectedColor = this.colors.find(
        color => color.id === selectedColorId
      );
      if (selectedColor !== undefined) {
        console.log("Color selection confirmed!");
        this.colorPasswordGuess.push(selectedColor);
      } else {
        console.log("There was an error at confirming the selected color");
      }
    },
    generateColorPassword() {
      const that = this;
      let password = [];
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * 3);
        const auxColor = that.colors.find(color => color.id === randomIndex);
        password.push(auxColor);
      }
      console.log(password);
      this.setColorPassword(password);
    },
    checkPassword(passArray) {
      const that = this;

      if (passArray && passArray.length > 0 && !this.rightAnswer) {
        this.roundCounter++;
        this.roundStatus = "";
        passArray.map((color, idx) => {
          const isSomewhereThere = that.colorPassword.includes(color);
          const isRightThere = that.colorPassword[idx].id === color.id;
          /* const isTheCorrectAnswer =
            that.rightAnswer && that.roundCounter <= 10; */

          if (isRightThere) {
            that.roundPoints++;
            that.roundStatus += `${color.name} is at correct position `;
          } else if (isSomewhereThere) {
            that.roundStatus += `There is one or multiple occurences of ${color.name} `;
          } /*  else if (isTheCorrectAnswer) {
            that.roundStatus = "YOU ARE A WINNER, BABY!!!";
          } */ else {
            that.roundStatus += `${color.name} is not there `;
          }
        });
        console.log(that.roundStatus);
        //const obj = Object.assign({}, that.colorPasswordGuess);
        return (that.colorPasswordGuess = []);
      } else {
        console.log("No password provided!");
      }
    }
  }
};
</script>

<style scoped>
button {
  background-color: #ddd;
  color: #222;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 0 20px;
}

button:disabled {
  cursor: block;
  background-color: grey;
}

.button--confirm {
  background-color: #32936f;
  color: white;
}

.gaming-section {
  display: flex;
  flex-direction: column;
}

.game-controls {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: whitesmoke;
  color: #222;
}

.game-controls-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 10px 5%;
}

.game-input-area {
  display: flex;
  margin-top: 50px;
}
</style>
