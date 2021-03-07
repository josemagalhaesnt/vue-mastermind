<template>
  <div class="ColorSelect">
    <select
      name="colors"
      id="colors"
      v-model="selectedColor"
      @change="selectColor"
    >
      <option
        class="color"
        :key="color.id"
        v-for="color in colors"
        :value="color"
      >
        <span class="color__value">{{ color.name }}</span>
      </option>
    </select>
  </div>
</template>

<script>
// import colorConstants from "../../constants/colorConstants";
export default {
  name: "ColorSelect",
  props: {
    colors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedColor: {}
    };
  },
  methods: {
    selectColor() {
      this.$emit("color-select", this.selectedColor.id);
      console.log("Your choice was: " + this.selectedColor.name);
    }
  }
};
</script>

<style>
.color__indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
