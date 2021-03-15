<template>
  <span class="ColorIcon icon has-text">
    <i class="fas fa-circle" :style="{ color: colorHex, fontSize: size }" />
  </span>
</template>

<script>
export default {
  name: 'ColorIcon',
  props: {
    colorHex: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: Number,
      default: 20
    }
  }
};
</script>

<style></style>
