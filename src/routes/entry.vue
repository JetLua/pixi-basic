<script lang="ts">
  export default Vue.extend({
    data() {
      return {
        name: 'done'
      }
    }
  })
</script>

<template>
  <section>
    <p v-text="name"></p>
    <button class="btn" @click="name = 123">ok</button>
  </section>
</template>
