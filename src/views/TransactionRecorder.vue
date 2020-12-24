<template xmlns="http://www.w3.org/1999/html">
  <div class="flex-box center">
    <div class="container">
      <h1 class="text-center">Add happy or sad face depending on choice.</h1>
      <form>
        <app-errors v-bind:errors="errors" />
        <label for="title" class="row">Title</label>
        <input class="row" id="title" type="text" v-model="title" />
        <label for="content" class="row">Content</label>
        <textarea class="row" id="content" autofocus rows="8" cols="50" v-model="content" />
        <div id="happy-buttons" class="text-center col-2">
          <div>
            <button type="submit" @click.prevent="applyHappyFace">&#128578;</button>
          </div>
          <div>
            <button type="submit" @click.prevent="applySadFace">&#128577;</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import transactionIp from '../api/transaction-axios'
import FormErrors from '../components/FormErrors'

export default {
  name: 'TransactionRecorder',
  data: () => {
    return {
      content: '',
      title: '',
      errors: []
    }
  },
  methods: {
    applyHappyFace () {
      this.sendTransactionHistory(true)
    },
    applySadFace () {
      this.sendTransactionHistory(false)
    },
    sendTransactionHistory (isGoodChoice) {
      if (this.checkForm()) {
        transactionIp.post('/history', {
          content: this.content,
          isGoodChoice: isGoodChoice,
          title: this.title
        }).then(() => {
          this.title = ''
          this.content = ''
        })
      }
    },
    checkForm () {
      this.errors = []
      if (!this.title) {
        this.errors.push('Title required.')
      }
      if (!this.content) {
        this.errors.push('Content required.')
      }
      return this.errors.length === 0
    }
  },
  components: {
    'app-errors': FormErrors
  }
}
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  min-width: 12rem;
}

#title {
  margin-bottom: 2rem;
}

label {
  display: block;
  text-align: center;
  line-height: 150%;
  font-size: 1.5rem;
}

  button {
    border: none;
    background-color: inherit;
    font-size: 3rem;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  button:hover {
    background-color: green;
    -webkit-box-shadow: 3px 3px 3px 3px rgba(24,69,24,1);
    -moz-box-shadow: 3px 3px 3px 3px rgba(24,69,24,1);
    box-shadow: 3px 3px 3px 3px rgba(24,69,24,1);
  }

  #title {
    display: block;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    font-size: 1.5rem;
    width: 40%;
    min-width: 12rem;
  }

  #happy-buttons {
    margin-top: 1rem;
  }
</style>
