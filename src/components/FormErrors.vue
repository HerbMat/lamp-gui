<template>
  <div class="error" v-if="errors.length">
    <p><b>Please correct the following error(s):</b></p>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FormErrorComponent',
  props: {
    errors: Array
  }
}
</script>

<style scoped>

</style>
