// //////////////////////////////////////////////////////////////
// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide
//
// For more information on working with page objects see:
//   https://nightwatchjs.org/guide/working-with-page-objects/
// //////////////////////////////////////////////////////////////

// module.exports = {
//   beforeEach: (browser) => browser.init(),
//
//   'e2e tests using page objects': (browser) => {
//     const homepage = browser.page.homepage();
//     homepage.waitForElementVisible('@appContainer');
//
//     const { app } = homepage.section;
//     app.assert.elementCount('@logo', 1);
//     app.expect.section('@welcome').to.be.visible;
//     app.expect.section('@headline').text.to.match(/^Welcome to Your Vue\.js (.*)App$/);
//
//     browser.end();
//   },
//
//   'verify if string "e2e-nightwatch" is within the cli plugin links': (browser) => {
//     const homepage = browser.page.homepage();
//     const welcomeSection = homepage.section.app.section.welcome;
//
//     welcomeSection.expect.element('@cliPluginLinks').text.to.contain('e2e-nightwatch');
//   },
// };

module.exports = {
  beforeEach: (browser) => {
    browser.init()
    browser.page.login()
  },

  'Missing username and password': (browser) => {
    const loginPage = browser.page.login()
    loginPage.waitForElementVisible('@loginForm')
    const { loginForm } = loginPage.section

    loginForm.click('@loginSubmit')
    loginForm.expect.element('@errors').to.be.visible
    loginForm.expect.element('@errors').text.to.contain('Please correct the following error(s):')
    loginForm.expect.element('@errors').text.to.contain('Password required.')
    loginForm.expect.element('@errors').text.to.contain('Name required.')
  },

  'Bad credentials': (browser) => {
    const loginPage = browser.page.login()
    loginPage.waitForElementVisible('@loginForm')
    const { loginForm } = loginPage.section
    loginForm.setValue('@usernameInput', 'bad')
    loginForm.setValue('@passwordInput', 'bad')

    loginForm.click('@loginSubmit')
    loginForm.expect.element('@errors').to.be.visible
    loginForm.expect.element('@errors').text.to.contain('Please correct the following error(s):')
    loginForm.expect.element('@errors').text.to.contain('Bad username or password')
  },

  'Login page loaded successfully': (browser) => {
    const loginPage = browser.page.login()
    loginPage.waitForElementVisible('@loginForm')
    const { loginForm } = loginPage.section
    loginForm.expect.element('@usernameInput').to.be.visible
    loginForm.expect.element('@passwordInput').to.be.visible
    loginForm.expect.element('@loginSubmit').to.be.visible
  },

  'Perform login successfully': (browser) => {
    const loginPage = browser.page.login()
    loginPage.waitForElementVisible('@loginForm')
    const { loginForm } = loginPage.section

    loginForm.setValue('@usernameInput', 'admin')
    loginForm.setValue('@passwordInput', 'admin')
    loginForm.click('@loginSubmit')
    browser.assert.elementCount('button', 4)
  }
}
