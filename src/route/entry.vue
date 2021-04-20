<script lang="ts">
  export default Vue.extend({
    data() {
      return {
        name: 'hi, guys.'
      }
    },

    methods: {
      click() {
        alert('clicked!')
      }
    }
  })
</script>

<template>
  <section>
    <p v-text="name"></p>
    <button class="btn" @click="click">ok</button>
  </section>
</template>
