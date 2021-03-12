<template>
  <div class="GameLogsSidebar column bg-is-primary is-right">
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
  name: 'GameLogsSidebar',
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
  height: 100%;
  margin: 40px 10px 0 10px;
  padding: 10px;
}
</style>
