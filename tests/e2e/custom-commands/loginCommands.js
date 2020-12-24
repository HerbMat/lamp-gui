module.exports = class {
  async command () {
    // Other Nightwatch commands are available via "this.api"
    this.api.init()
    this.api.waitForElementVisible('#app')

    const result = await this.api.elements('css selector', '#app ul')
    assert.strictEqual(result.value.length, 3)
  }
}
