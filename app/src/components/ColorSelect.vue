<template>
  <select
    name="colors"
    class="ColorSelect"
    id="colors"
    v-model="selectedColor"
    @change="selectColor"
  >
    <option :key="color.colorId" v-for="color in colors" :value="color">
      <span class="color__value">{{ color.name }}</span>
    </option>
  </select>
</template>

<script>
// import colorConstants from "../../constants/colorConstants";
export default {
  name: 'ColorSelect',
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
      this.$emit('color-select', this.selectedColor.colorId);
      console.log('Your choice was: ' + this.selectedColor.name);
    }
  }
};
</script>

<style></style>
