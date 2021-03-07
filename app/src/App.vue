<template>
  <GamingSection />
</template>

<script>
import GamingSection from "./components/GamingSection";

export default {
  name: "App",
  components: {
    GamingSection
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost&display=swap");

:root {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
