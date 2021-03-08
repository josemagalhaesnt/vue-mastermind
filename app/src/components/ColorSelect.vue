<template>
  <div class="ColorSelect control has-icons-left">
    <div class="select is-rounded is-medium">
      <select
        name="colors"
        id="colors"
        v-model="selectedColor"
        @change="selectColor"
      >
        <option :key="color.id" v-for="color in colors" :value="color">
          <span class="color__value">{{ color.name }}</span>
        </option>
      </select>
    </div>
    <div class="icon is-small is-left">
      <i class="fas fa-fill-drip"></i>
    </div>
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
.ColorSelect {
  margin: 0 15px;
}
</style>
