<template>
  <ul>
    <template v-if="!auth">
      <router-link :to="{ name: 'login'}" active-class="active" tag="li" @click.native="onClick"><a>Log in</a>
      </router-link>
    </template>
    <template v-else>
      <router-link :to="{ name: 'home'}" active-class="active" tag="li" @click.native="onClick"><a>Home</a>
      </router-link>
      <router-link :to="{ name: 'weather'}" active-class="active" tag="li" @click.native="onClick"><a>Weather</a>
      </router-link>
      <router-link :to="{ name: 'transactions'}" active-class="active" tag="li" @click.native="onClick"><a>Transaction Recorder</a>
      </router-link>
      <router-link :to="{ name: 'transactionHistory'}" active-class="active" tag="li" @click.native="onClick"><a>Transaction History</a>
      </router-link>
      <li><a v-on:click.prevent="logout">Log out</a></li>
    </template>
  </ul>
</template>

<script>
import router from '../router'

export default {
  name: 'NavLinks',
  computed: {
    auth () {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => router.replace('/login'))
    },
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss">

</style>
