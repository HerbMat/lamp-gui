// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Login is rendered': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.login-form-layout')
      .assert.containsText('label', 'Username')
      .assert.elementCount('label', 2)
      .end()
  }
}
