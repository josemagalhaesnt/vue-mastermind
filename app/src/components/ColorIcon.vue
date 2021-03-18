<template>
  <span v-if="isValidColor" class="ColorIcon icon has-text">
    <i class="fas fa-circle" :style="{ color: colorHex }" />
  </span>
</template>

<script>
export default {
  name: 'ColorIcon',
  computed: {
    isValidColor() {
      return this.$props.colorHex !== 'transparent';
    }
  },
  props: {
    colorHex: {
      type: String,
      required: true,
      default: ''
    }
  }
};
</script>

<style></style>
