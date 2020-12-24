<template>
  <div class="flex-box center">
    <div class="container">
      <h1 class="text-center">Transaction History</h1>
      <div class="row" v-for="transaction in transactions" :key="transaction.id">
        <h3 class="row text-center transaction-title"
            @click="transaction.isVisibleContent = !transaction.isVisibleContent">{{ transaction.title }}</h3>
        <div class="transaction-content" v-if="transaction.isVisibleContent">
            <p v-bind:class="{ 'face text-center': isSmallWidth, 'face inlined-left': !isSmallWidth }">{{ transaction.isGoodTransaction ? '&#128578;' : '&#128577;' }}</p>
            <p>{{ transaction.content }}</p>
        </div>
      </div>
      <button v-if="!areAllLoaded" class="row" v-on:click="loadMore">Load More</button>
    </div>
  </div>
</template>

<script>
import { getTransactions } from '../api/transaction-axios'

export default {
  name: 'Transactions',
  data: () => {
    return {
      transactions: [],
      page: 0,
      size: 2,
      areAllLoaded: false
    }
  },
  computed: {
    isSmallWidth () {
      return this.$store.getters.isSmallWidth
    }
  },
  methods: {
    addTransaction (transaction) {
      transaction.isVisibleContent = false
      this.transactions.push(transaction)
    },
    loadMore () {
      getTransactions(this.page, this.size)
        .node('{id content title isGoodTransaction}', (transaction) => {
          this.addTransaction(transaction)
        }).done((fetchedRecord) => {
          if (fetchedRecord.hasOwnProperty('content') === false) {
            this.areAllLoaded = true
          }
        })

      this.page += 1
    }
  },
  created () {
    this.loadMore()
  }
}
</script>

<style scoped>
  .transaction-title {
    -webkit-box-shadow: 3px 3px 3px 3px rgba(101, 194, 93, 1);
    -moz-box-shadow: 3px 3px 3px 3px rgba(101, 194, 93, 1);
    box-shadow: 3px 3px 3px 3px rgba(101, 194, 93, 1);
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-style: italic;
    font-weight: lighter;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    cursor: pointer;
  }

  .transaction-title:hover {
    background-color: lightsteelblue;
    color: #0493bd;
    -webkit-box-shadow: 3px 3px 3px 3px rgba(14,118,245,1);
    -moz-box-shadow: 3px 3px 3px 3px rgba(14,118,245,1);
    box-shadow: 3px 3px 3px 3px rgba(14,118,245,1);
  }

  .transaction-content {
    border-radius: 0px 0px 0px 0px;
    -moz-border-radius: 0px 0px 0px 0px;
    -webkit-border-radius: 0px 0px 0px 0px;
    border: 1px solid #2bf02b;
    text-overflow: ellipsis;
    word-break: break-all;
    min-height: 5rem;
  }

  .transaction-content > p {
    margin: 1rem;
    text-overflow: ellipsis;
    min-width: 3rem;
  }

  .face {
    font-size: 3rem;
    margin: 0.5rem;
  }

  .inlined-left {
    float: left;
    clear: left;
    width: 4rem;
    height: 4rem;
  }

  button {
    font-weight:500;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;
    border: 3px solid rgba(0,0,0,0);
    line-height: 22px;
    background-color: green;
    padding: 13px 13px 13px 13px;
    margin-bottom: 10px;
    border-radius: 7px;
    color: white;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  button:hover {
    background-color: lightsteelblue;
    color: #0493bd;
  }
</style>
