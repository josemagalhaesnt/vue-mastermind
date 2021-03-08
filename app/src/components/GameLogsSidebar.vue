<template>
  <div class="GameLogsSidebar column is-right">
    <aside class="panel is-info">
      <p class="panel-heading">Game Logs</p>
      <div class="panel-block">
        <div class="content">
          <div
            class="message is-link"
            :key="log.id"
            v-bind="log"
            v-for="log in logs"
          >
            <div class="message-body">
              <p>{{ log.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "GameLogsSidebar",
  props: {
    logs: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.GameLogsSidebar {
  max-width: 50vw;
  height: 100%;
  margin: 50px 10px 0 10px;
  padding: 10px;
}
</style>
