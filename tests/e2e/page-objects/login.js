/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
  url: '/login',
  commands: [],

  // A page object can have elements
  elements: {
    loginForm: {
      selector: '.login-form-layout'
    }
  },

  // Or a page objects can also have sections
  sections: {
    loginForm: {
      selector: '.login-form-layout',
      elements: {
        usernameInput: {
          selector: '#username'
        },
        passwordInput: {
          selector: '#password'
        },
        loginSubmit: {
          selector: '#login-submit'
        },
        errors: {
          selector: '.error'
        }
      }
    }
  }
}
