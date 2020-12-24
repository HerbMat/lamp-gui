<template>
  <div id="app" class="row">
    <app-header/>
    <div class="page-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header
  },
  created () {
    let that = this
    window.addEventListener(
      'resize',
      () => {
        that.$store.commit('setWindowWidth')
      }
    )
  }
}
</script>

<style lang="scss">

  body > * {
    overflow: auto;
  }

  body {
    min-width: 12rem;
    margin: 0 0 0 0;
    height: 100%;
  }

  .page-content {
    margin-top: 8rem;
  }

  h1 {
    font-family: Arial,fantasy;
  }

  .row {
    width: 100%;
  }

  .container {
    min-width: 12rem;
    width: 80%;
  }

  .flex-box {
    display: flex;
    margin: 3rem 1rem 1rem 1rem;
    padding: 1rem 1rem 1rem 1rem;
  }

  .center {
    align-items: center;
    justify-content: center;
  }

  .text-center {
    text-align:center;
  }

  .col-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    grid-auto-rows: minmax(6rem, auto);
  }

  .error {
    color: red;
    background-color: rgba(255, 0, 0, 0.2);
    ul {
      margin: 0;
    }
    * {
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  .col-3-4 {
    flex: 3 0 0;
  }

  .col-1-4 {
    flex: 1 0 0;
  }
</style>
